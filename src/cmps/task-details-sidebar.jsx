import { useRef } from 'react'
import { BsPerson, BsCheck2Square, BsSquareHalf } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'

export const TaskDetailsSidebar = ({ onOpenActionModal }) => {

    // Refs for action modal position calculation
    const btnAttachmentRef = useRef()
    const btnMembersRef = useRef()
    const btnLabelsRef = useRef()
    const btnChecklistRef = useRef()
    const btnDatesRef = useRef()
    const btnCoverRef = useRef()

    const actionBtns = [
        {
            type: 'Members',
            ref: btnMembersRef,
            iconCmp: <BsPerson className="icon" />,
        },
        {
            type: 'Labels',
            ref: btnLabelsRef,
            iconCmp: <AiOutlineTag className="icon" />,
        },
        {
            type: 'Checklist',
            ref: btnChecklistRef,
            iconCmp: <BsCheck2Square className="icon" />,
        },
        {
            type: 'Dates',
            ref: btnDatesRef,
            iconCmp: <AiOutlineClockCircle className="icon" />,
        },
        {
            type: 'Attachment',
            ref: btnAttachmentRef,
            iconCmp: <ImAttachment className="icon" />,
        },
        {
            type: 'Cover',
            ref: btnCoverRef,
            iconCmp: (
                <BsSquareHalf
                    className="icon"
                    style={{
                        transform: 'rotate(0.75turn) translateY(-20%) translateX(22%)',
                    }}
                />
            ),
        },
    ]

    return (
        <section className="task-sidebar">
            <h3 className="sidebar-title">Add to card</h3>

            {actionBtns.map(btn => (
                <button className="btn-sidebar"
                    onClick={() => onOpenActionModal(btn.type, btn.ref)}
                    key={btn.type}
                    ref={btn.ref}>
                    {btn.iconCmp}
                    {btn.type}
                </button>
            ))}
        </section>
    )
}