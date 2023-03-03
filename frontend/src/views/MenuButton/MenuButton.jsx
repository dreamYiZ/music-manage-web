import classes from "./MenuButton.module.sass";

function MenuButton({ icon, children, onClick }) {
  return (
    <div className={classes.MenuButton}>
      {icon}
      <span onClick={onClick} className={classes.MenuTitle}>
        {children}
      </span>
    </div>
  );
}

export default MenuButton;
