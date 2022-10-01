import { HeaderBoardPreview } from "./header-board-preview"

export const HeaderBoardList = ({ boards, setActionModal }) => {
    return <section className="header-board-list">
        {
            boards.map(board => <HeaderBoardPreview board={board} setActionModal={setActionModal} />)
        }
    </section>
}