import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img
        className={classes.header__icon}
        alt="Header Icon"
        src="./svg/main.svg"
      />
      <h1 className={classes.header__title}>Todo App</h1>
    </header>
  );
};

export default Header;
