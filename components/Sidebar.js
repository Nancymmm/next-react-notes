import React, { Suspense } from 'react';
import Link from 'next/link';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
export default async function Sidebar() {
  //   const notes = await getAllNotes();
  // 移除数据请求部分，为SidebarNoteList添加Suspense以及fallback UI NoteListSkeleton
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
