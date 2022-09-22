export const SideMenuBackgroundOptions = ({ onChangeTitle }) => {

    return (<section className="side-menu-background-options">
        <section className="option" onClick={() => onChangeTitle('Colors')}>
            <div className="display colors"></div>
            <p>Colors</p>
        </section>
        <section className="option" onClick={() => onChangeTitle('Photos by')}>
            <div className="display photos"></div>
            <p>Photos</p>
        </section>
    </section>)
}