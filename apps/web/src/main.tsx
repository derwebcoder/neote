import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { TagDB, TagService } from '@neote/tags';
import { DI } from "@neote/dependency-injection";

(async () => {
  const db = new TagDB();
  const tagService = await TagService.construct(db);
  DI.inject("TagService", tagService);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})()
