import dayjs from 'dayjs';
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';

export default function SidebarNoteItem({ noteId, note }) {
  const { title, content = '', updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {typeof content === 'string' ? (
            content.substring(0, 20)
          ) : (
            <i>(No content)</i>
          )}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
