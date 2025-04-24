// import { Button } from "@/components/ui/button";
// import Balloon from "../../../assets/icons/balloon.svg";

export const EditorMain = () => {
  return (
    <div className="flex h-full w-full">
      <neote-editor
        extension-tag="enabled"
        placeholder="Add your next note here ..."
        className="h-full w-full rounded-sm border-1 border-stone-200 p-2 outline-0 focus-within:border-stone-400"
      ></neote-editor>
      {/* <div className="flex flex-col">
        <Button variant="secondary">
          <img src={Balloon} alt="balloon" className="mr-2 h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
};
