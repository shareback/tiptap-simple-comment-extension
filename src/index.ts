import { Mark, mergeAttributes } from "@tiptap/core";

export interface CommentsOptions {
  /**
   * HTML attributes to add to the span element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    comment: {
      setComment: () => ReturnType;
    };
  }
}

const CommentsExtension = Mark.create<CommentsOptions>({
  name: "comment",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      commentId: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "comment",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "comment",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setComment:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      // toggleBold: () => ({ commands }) => {
      //   return commands.toggleMark(this.name)
      // },
      // unsetBold: () => ({ commands }) => {
      //   return commands.unsetMark(this.name)
      // },
    };
  },

  // do your stuff here
});

export { CommentsExtension };

export default CommentsExtension;
