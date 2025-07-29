import { TagIconNames } from "$/config/TagIconConfig";
import { Tag } from "$/models/Tag";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/ui/elements/select";
import { TagIconMap } from "$/config/TagIconConfig";
import { DI } from "@/modules/dependency-injection";
import "./TagIconSelect.css"

export const TagIconSelect = ({ tag }: { tag: Tag }) => {
  return (
    <Select
      defaultValue={tag.getIcon()}
      onValueChange={(value: typeof TagIconNames[number]) => {
        tag.setIcon(value);
        DI.resolve("TagService").update(tag);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={"Select an icon"} />
      </SelectTrigger>
      <SelectContent>
        {TagIconNames.map((icon) => {
          return (
            <SelectItem
              key={icon}
              value={icon}
            >
              <span className="TagIconSelect flex flex-row items-center gap-2" style={{
                "--icon": `url(data:image/svg+xml;utf8,${encodeURIComponent(TagIconMap[icon])})`,
              } as React.CSSProperties}>
                {icon}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  )
}