import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';

import { requestStore } from '../../entities/request/model/store';
import styles from './index.module.css';

export const RequestListWidget = observer(() => {
  const navigate = useNavigate();

  return (
    <div className={styles.requestList}>
      <h1>Список заявок</h1>
      <button onClick={() => navigate('/requests/new')}>Создать заявку</button>

      <ul>
        {requestStore.requests.map((r) => (
          <li key={r.id}>
            <Link to={`/requests/${r.id}`}>
              <b>{r.title}</b> — {new Date(r.createdAt).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
