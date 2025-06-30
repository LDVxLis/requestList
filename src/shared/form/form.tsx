import { observer } from 'mobx-react-lite';
import { useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CATEGORIES } from '../types/request';
import { requestStore } from '../../entities/request/model/store';
import styles from './form.module.css';

interface FormProps {
  action: 'edit' | 'create';
}

export const Form = observer(({ action }: FormProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (action === 'edit' && id) {
      const req = requestStore.getRequestById(id);

      if (req) requestStore.fillCurrentRequest(req);
    } else {
      requestStore.reset();
    }
  }, [action, id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!requestStore.isValid) {
      requestStore.setError('Пожалуйста, заполните все поля.');

      return;
    }

    if (action === 'create') {
      requestStore.addRequest();
    }

    if (action === 'edit' && id) {
      requestStore.updateRequest(id);
    }

    requestStore.setIsEditing(false);
    navigate('/requests');
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => requestStore.setError('')}
      className={styles.requestForm}
    >
      <input
        className={styles.requestFormField}
        value={requestStore.title}
        placeholder="Заголовок"
        onChange={(e) => requestStore.setTitle(e.target.value)}
      />
      <textarea
        className={styles.requestFormField}
        value={requestStore.description}
        placeholder="Описание"
        onChange={(e) => requestStore.setDescription(e.target.value)}
      />
      <select
        className={styles.requestFormField}
        value={requestStore.category}
        onChange={(e) => requestStore.setCategory(e.target.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      {requestStore.error && <p className={styles.requestFormError}>{requestStore.error}</p>}

      <button type="submit" className={styles.requestFormAction}>
        {action === 'create' ? 'Создать' : 'Сохранить'}
      </button>
    </form>
  );
});
