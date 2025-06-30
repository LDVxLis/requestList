import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

import { requestStore } from '../../entities/request/model/store';
import { Form } from '../../shared/form/form';
import styles from './index.module.css';

export const RequestDetail = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const request = useMemo(
    () => (id ? requestStore.getRequestById(id) : null),
    [id, requestStore.getRequestById],
  );

  const removeRequest = () => {
    if (id) {
      requestStore.removeRequest(id);
      navigate('/requests');
    }
  };

  if (id && !request) {
    return <div>Заявка не найдена</div>;
  }

  return (
    <div>
      <h2>Карточка заявки</h2>

      {requestStore.isEditing ? (
        <Form action="edit" />
      ) : (
        request && (
          <>
            <div className={styles.requestInfo}>
              <p>Заголовок: {request.title}</p>
              <p>Описание: {request.description}</p>
              <p>Категория: {request.category}</p>
            </div>

            <div className={styles.requestActions}>
              <button onClick={() => navigate('/requests')}>Назад</button>
              <button onClick={() => requestStore.setIsEditing(true)}>Редактировать</button>
              {id && <button onClick={removeRequest}>Удалить заявку</button>}
            </div>
          </>
        )
      )}
    </div>
  );
});
