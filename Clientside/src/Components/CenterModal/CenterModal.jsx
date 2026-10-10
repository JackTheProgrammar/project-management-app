import "./CenterModal.less";

function CenterModal({
  isOpen,
  title,
  onClose,
  children,
  footerButtons = [],
  customClass = "",
  closeOnOverlayClick = true,
  showCloseButton = true,
}) {
  if (!isOpen) {
    return null;
  }

  function handleOverlayClick() {
    if (closeOnOverlayClick && onClose) {
      onClose();
    }
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <div
      className={`center-modal-overlay ${customClass}`.trim()}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="center-modal"
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="center-modal-title"
      >
        <header className="center-modal-header">
          <h2 id="center-modal-title" className="center-modal-title">
            {title}
          </h2>
          {showCloseButton && (
            <button
              type="button"
              className="center-modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          )}
        </header>

        <div className="center-modal-body">{children}</div>

        {footerButtons.length > 0 && (
          <footer className="center-modal-footer">
            {footerButtons.map((button, index) => {
              const variant = button.variant || "secondary";

              return (
                <button
                  key={button.id ?? index}
                  type={button.type || "button"}
                  className={`center-modal-footer-btn center-modal-footer-btn--${variant}`}
                  onClick={button.onClick}
                  disabled={button.disabled}
                >
                  {button.label}
                </button>
              );
            })}
          </footer>
        )}
      </div>
    </div>
  );
}

export default CenterModal;
