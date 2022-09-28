import { useRef } from 'react'
import { BsPerson, BsCheck2Square, BsSquareHalf } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
import { GoArchive } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { removeTask } from '../../store/actions/task.action'
import { useNavigate } from 'react-router-dom'
import { IoLocationSharp } from 'react-icons/io5'

export const TaskDetailsSidebar = ({ onOpenActionModal, taskId, groupId }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Refs for action modal position calculation
    const btnAttachmentRef = useRef()
    const btnMembersRef = useRef()
    const btnLabelsRef = useRef()
    const btnChecklistRef = useRef()
    const btnDatesRef = useRef()
    const btnCoverRef = useRef()
    const btnRemoveRef = useRef()
    const btnLocationRef = useRef()

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
        }, {
            type: 'Location',
            ref: btnLocationRef,
            iconCmp: <IoLocationSharp className="icon" />,
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
        }
    ]

    const onRemoveTask = () => {
        dispatch(removeTask(groupId, taskId))
        navigate(-1)
    }

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
            ))
            }

            <button onClick={onRemoveTask} className='btn-sidebar' ref={btnRemoveRef}><GoArchive className="icon" />Delete</button>
        </section >
    )
}