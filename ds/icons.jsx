/* global */
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconPlus = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IconChevron = () => (<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="m4 3 4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconFilter = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 8h6M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IconDownload = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0L5 7m3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconUpload = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0L8 8m4-4 4 4M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconWarning = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3 2 17h16L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8v4m0 2.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IconInfo = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IconCheck = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m3 8 3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconX = () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m3 3 6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IconDna = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 2c0 3 8 5 8 8s-8 2-8 5M12 2c0 3-8 5-8 8s8 2 8 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M5.5 5h5M5.5 8h5M5.5 11h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".5"/></svg>);
const IconFile = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 2h6l4 4v8H3V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>);
const IconSettings = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 2v2M8 12v2M14 8h-2M4 8H2M12.2 3.8l-1.4 1.4M5.2 10.8l-1.4 1.4M12.2 12.2l-1.4-1.4M5.2 5.2 3.8 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IconSend = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m2 8 12-6-5 12-2-5-5-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>);
const IconTrash = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V2h4v2M4 4l1 10h6l1-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconBeaker = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 2h4v4l3 7a1 1 0 0 1-.9 1.5H3.9A1 1 0 0 1 3 13l3-7V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>);
const IconUser = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 14c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>);

Object.assign(window, {
  IconSearch, IconPlus, IconChevron, IconFilter, IconDownload, IconUpload,
  IconWarning, IconInfo, IconCheck, IconX, IconDna, IconFile, IconSettings,
  IconSend, IconTrash, IconBeaker, IconUser
});
