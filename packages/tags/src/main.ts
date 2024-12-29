import { DI } from "@neote/dependency-injection";
import "./components/TagComponent";
import { TagService } from "./services/TagService";

DI.inject("TagService", new TagService());
