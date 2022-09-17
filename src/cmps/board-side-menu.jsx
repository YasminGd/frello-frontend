export const BoardSideMenu = ({ width, onCloseSideMenu }) => {
    return <section className="board-side-menu" style={width}>
        <section className="header">
            <h3>Menu</h3>
            <section className="svg-holder" onClick={onCloseSideMenu}>
                <svg stroke="currentColor" fill="currentColor" strokeidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg>
            </section>
        </section>
        <section className="divider"></section>
        <section className="board-menu-content-frame">
            <button>Change background</button>
        </section>
    </section>
}