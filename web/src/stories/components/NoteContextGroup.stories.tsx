import type { Meta, StoryObj } from "@storybook/react";
import { NoteContextGroup } from "@/components/NoteContextGroup/NoteContextGroup";
import { Note } from "@/modules/notes/models/Note";
import { NoteDB } from "@/modules/notes/db/NoteDB";
import { NoteService } from "@/modules/notes/services/NoteService";
import { DI } from "@/modules/dependency-injection";
import { Tag, TagDB, TagService } from "@/modules/tags";
import "@/modules/tags/components/NeoteTag";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/NoteContextGroup",
  component: NoteContextGroup,
  decorators: [
    (Story) => (
      <div className="h-60 w-full" data-tag-style="chip-border">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof NoteContextGroup>;

const noteDB = new NoteDB();
const noteService = new NoteService(noteDB);
DI.inject("NoteService", noteService);
const tagDB = new TagDB();
const tagService = await TagService.construct(tagDB);
DI.inject("TagService", tagService);

/**
 * Prepare some example data
 */
const tagNature = new Tag("nature", "Nature is beautiful", "star", 125);
const tagAdventure = new Tag("adventure", "Adventure awaits", "map-pin", 200);

const noteTree = new Note(
  "1",
  "<neote-tag name='nature' data-context-tag=''></neote-tag> <neote-tag name='adventure' data-context-tag=''></neote-tag> The <neote-tag name='tree'></neote-tag> in front of our house is beautiful.",
  "nature adventure The tree in front of our house is beautiful.",
  new Date(),
  ["nature", "tree", "house"],
  ["nature", "tree"],
);
const noteStars = new Note(
  "2",
  "<neote-tag name='nature' data-context-tag=''></neote-tag> <neote-tag name='adventure' data-context-tag=''></neote-tag> I like to look at the stars at night.",
  "nature adventure I like to look at the stars at night.",
  new Date(),
  ["nature", "adventure"],
  ["nature", "adventure"],
);
const noteCamping = new Note(
  "3",
  "<neote-tag name='nature' data-context-tag=''></neote-tag> <neote-tag name='adventure' data-context-tag=''></neote-tag> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor elit sed ipsum tempor, ut interdum dolor egestas. Integer fringilla pulvinar lectus auctor rhoncus. Nam mauris lectus, viverra et mollis eget, semper convallis sem. Fusce lacinia purus leo, et feugiat tortor vehicula et. Integer a consectetur elit. Pellentesque tempor id nulla sit amet rhoncus. Phasellus a rhoncus justo. Vestibulum pulvinar enim eget orci tincidunt, ut iaculis lacus faucibus. Mauris commodo ac enim eget elementum. Proin sit amet neque vestibulum, accumsan magna vitae, congue nibh. Donec nisl nulla, vulputate et tortor et, accumsan suscipit elit. Mauris quis facilisis tellus. Phasellus a nisl tempus, mollis purus vel, ultricies diam. Suspendisse sed libero sagittis, consequat lorem a, ultricies nibh. Vestibulum non arcu ac arcu aliquet tempus at nec nisi. Morbi sodales nec orci in sodales.Nam vitae orci vel ligula posuere euismod. Curabitur nec pellentesque nulla. Pellentesque gravida sed mi quis tempor. Nunc nec justo leo. Nulla vel risus sed urna feugiat egestas at eget mi. Donec egestas congue pulvinar. Morbi faucibus, mauris quis ornare consequat, eros dui porta lacus, at rhoncus arcu felis in augue. Praesent nibh turpis, consequat non massa eu, cursus posuere ipsum. Donec gravida mattis rutrum. Proin vehicula, augue et commodo laoreet, nulla purus ullamcorper tellus, ut tincidunt ipsum libero eget est.Nullam et nulla cursus turpis rhoncus mattis sed eget mauris. Sed lacinia nulla id sodales scelerisque. Sed suscipit tempor dui at semper. Sed consequat massa ac odio ornare vulputate. Fusce libero ex, aliquet et fermentum et, faucibus nec felis. Nunc dignissim nec risus sed tempus. Sed sit amet ullamcorper orci. In et nisl lacinia, rhoncus magna eu, efficitur massa. Aenean laoreet ligula risus, scelerisque mollis risus cursus sed. Quisque id leo maximus, finibus dui a, laoreet ligula. Aenean luctus massa vel sem ullamcorper efficitur. Proin dignissim at ipsum id dapibus. Suspendisse urna nunc, congue porta tempus eget, posuere eget ipsum. Phasellus dapibus est eu fermentum vestibulum. Integer fringilla massa dolor, at gravida justo sagittis sit amet. Quisque aliquam, nulla vitae finibus blandit, nunc mi mattis mauris, vitae malesuada est nisi viverra mi.Cras eget aliquam elit. Mauris at lectus interdum ligula gravida malesuada id eget odio. Aliquam id mattis tortor. In iaculis efficitur laoreet. Proin sit amet lorem in massa dapibus gravida in at augue. Etiam porttitor nisi tincidunt eros dictum suscipit. Morbi sit amet mollis metus, in facilisis ipsum. Nulla eros sem, interdum ut rhoncus quis, cursus quis est.Donec hendrerit faucibus nunc, vitae tempus lacus sodales ac. Nulla lacinia metus quis pretium elementum. Ut fringilla ex a elit aliquam posuere. Phasellus pulvinar consequat ligula eget vulputate. Duis ac velit non ligula tincidunt accumsan. Donec lacinia purus nulla, ut faucibus sem mattis in. Curabitur nec ante pulvinar, vestibulum nulla convallis, vehicula arcu. Nullam volutpat venenatis pellentesque. Vestibulum et eleifend dolor, ac convallis est. Fusce id est nec risus bibendum ornare. Nam consequat congue malesuada. Morbi fringilla, augue et feugiat interdum, sem mi tincidunt turpis, sit amet euismod neque lorem eu mauris. Fusce in augue at nisi posuere luctus. In a ex sollicitudin, auctor nunc ac, lobortis sem. Suspendisse cursus ipsum quis velit tempus tempor. Curabitur tristique elit luctus fermentum rutrum. ",
  "nature adventure  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor elit sed ipsum tempor, ut interdum dolor egestas. Integer fringilla pulvinar lectus auctor rhoncus. Nam mauris lectus, viverra et mollis eget, semper convallis sem. Fusce lacinia purus leo, et feugiat tortor vehicula et. Integer a consectetur elit. Pellentesque tempor id nulla sit amet rhoncus. Phasellus a rhoncus justo. Vestibulum pulvinar enim eget orci tincidunt, ut iaculis lacus faucibus. Mauris commodo ac enim eget elementum. Proin sit amet neque vestibulum, accumsan magna vitae, congue nibh. Donec nisl nulla, vulputate et tortor et, accumsan suscipit elit. Mauris quis facilisis tellus. Phasellus a nisl tempus, mollis purus vel, ultricies diam. Suspendisse sed libero sagittis, consequat lorem a, ultricies nibh. Vestibulum non arcu ac arcu aliquet tempus at nec nisi. Morbi sodales nec orci in sodales.Nam vitae orci vel ligula posuere euismod. Curabitur nec pellentesque nulla. Pellentesque gravida sed mi quis tempor. Nunc nec justo leo. Nulla vel risus sed urna feugiat egestas at eget mi. Donec egestas congue pulvinar. Morbi faucibus, mauris quis ornare consequat, eros dui porta lacus, at rhoncus arcu felis in augue. Praesent nibh turpis, consequat non massa eu, cursus posuere ipsum. Donec gravida mattis rutrum. Proin vehicula, augue et commodo laoreet, nulla purus ullamcorper tellus, ut tincidunt ipsum libero eget est.Nullam et nulla cursus turpis rhoncus mattis sed eget mauris. Sed lacinia nulla id sodales scelerisque. Sed suscipit tempor dui at semper. Sed consequat massa ac odio ornare vulputate. Fusce libero ex, aliquet et fermentum et, faucibus nec felis. Nunc dignissim nec risus sed tempus. Sed sit amet ullamcorper orci. In et nisl lacinia, rhoncus magna eu, efficitur massa. Aenean laoreet ligula risus, scelerisque mollis risus cursus sed. Quisque id leo maximus, finibus dui a, laoreet ligula. Aenean luctus massa vel sem ullamcorper efficitur. Proin dignissim at ipsum id dapibus. Suspendisse urna nunc, congue porta tempus eget, posuere eget ipsum. Phasellus dapibus est eu fermentum vestibulum. Integer fringilla massa dolor, at gravida justo sagittis sit amet. Quisque aliquam, nulla vitae finibus blandit, nunc mi mattis mauris, vitae malesuada est nisi viverra mi.Cras eget aliquam elit. Mauris at lectus interdum ligula gravida malesuada id eget odio. Aliquam id mattis tortor. In iaculis efficitur laoreet. Proin sit amet lorem in massa dapibus gravida in at augue. Etiam porttitor nisi tincidunt eros dictum suscipit. Morbi sit amet mollis metus, in facilisis ipsum. Nulla eros sem, interdum ut rhoncus quis, cursus quis est.Donec hendrerit faucibus nunc, vitae tempus lacus sodales ac. Nulla lacinia metus quis pretium elementum. Ut fringilla ex a elit aliquam posuere. Phasellus pulvinar consequat ligula eget vulputate. Duis ac velit non ligula tincidunt accumsan. Donec lacinia purus nulla, ut faucibus sem mattis in. Curabitur nec ante pulvinar, vestibulum nulla convallis, vehicula arcu. Nullam volutpat venenatis pellentesque. Vestibulum et eleifend dolor, ac convallis est. Fusce id est nec risus bibendum ornare. Nam consequat congue malesuada. Morbi fringilla, augue et feugiat interdum, sem mi tincidunt turpis, sit amet euismod neque lorem eu mauris. Fusce in augue at nisi posuere luctus. In a ex sollicitudin, auctor nunc ac, lobortis sem. Suspendisse cursus ipsum quis velit tempus tempor. Curabitur tristique elit luctus fermentum rutrum. ",
  new Date(),
  ["nature", "adventure"],
  ["nature", "adventure"],
);

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    context: [tagNature, tagAdventure],
    notes: [noteTree, noteStars, noteCamping],
  },
};
