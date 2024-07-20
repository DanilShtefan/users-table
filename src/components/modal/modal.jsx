import "./modal.scss";

export function Modal({ modalActive, setModalActive }) {
  return (
    <div
      className={modalActive.boolean ? "modal active" : "modal"}
      onClick={() => setModalActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li>ФИО - {modalActive.fullname}</li>
          <li>Возраст - {modalActive.age}</li>
          <li>Адрес - {modalActive.address}</li>
          <li>Рост - {modalActive.height}</li>
          <li>Вес - {modalActive.weight}</li>
          <li>Номер телефона - {modalActive.phone}</li>
          <li>Email - {modalActive.email}</li>
        </ul>
      </div>
    </div>
  );
}
