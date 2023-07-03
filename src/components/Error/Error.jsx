import css from './Error.module.css';
export default function Error(error) {
  return (
    <div className={css.error}>
      <h1>{error.message}</h1>
    </div>
  );
}