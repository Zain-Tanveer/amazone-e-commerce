<template>
  <v-layout v-if="editor">
    <v-row no-gutters>
      <v-col cols="12" class="white d-flex align-center">
        <editor-content :editor="editor" class="flex-grow-1" />
        <div class="px-2">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="white pa-0 px-2 py-5"
                depressed
                rounded
                min-width="0"
                v-on="on"
                v-bind="attrs"
                @click="handleMessageSend"
              >
                <v-icon>mdi-send-variant-outline</v-icon>
              </v-btn>
            </template>
            <span>Send Message</span>
          </v-tooltip>
        </div>
      </v-col>

      <v-col cols="12" class="editor-menubar px-1">
        <!-- menubar marks -->
        <v-btn
          v-for="mark in menubarMarks"
          :key="mark.type"
          class="menubar-buttons pa-0 px-2 py-5"
          :class="{ 'is-active': editor.isActive(mark.type) }"
          @click="handleMenubarMarkToggle(mark.type)"
          depressed
          rounded
          min-width="0"
        >
          <v-icon>{{ mark.icon }}</v-icon>
        </v-btn>

        <!-- menubar nodes -->
        <v-btn
          v-for="node in menubarNodes"
          :key="node.type"
          class="menubar-buttons pa-0 px-2 py-5"
          :class="{ 'is-active': editor.isActive(node.type) }"
          @click="handleMenubarNodeToggle(node.type)"
          depressed
          rounded
          min-width="0"
        >
          <v-icon>{{ node.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent } from "@tiptap/vue-2";

export default {
  components: {
    EditorContent,
  },

  mounted() {
    this.editor = new Editor({
      autofocus: true,

      extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({
          placeholder: "Enter your message here ...",
        }),
      ],
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  data() {
    return {
      editor: null,

      menubarMarks: [
        { type: "bold", icon: "mdi-format-bold" },
        { type: "italic", icon: "mdi-format-italic" },
        { type: "strike", icon: "mdi-format-strikethrough" },
        { type: "underline", icon: "mdi-format-underline" },
      ],

      menubarNodes: [
        { type: "codeBlock", icon: "mdi-code-tags" },
        { type: "bulletList", icon: "mdi-format-list-bulleted" },
        { type: "orderedList", icon: "mdi-format-list-numbered" },
      ],
    };
  },

  methods: {
    handleMessageSend() {
      if (this.editor.isEmpty) {
        return;
      }

      const message = this.editor.getHTML();
      // do something with message

      this.editor.commands.clearContent();
    },

    handleMenubarMarkToggle(type) {
      if (type === "bold") {
        this.editor.chain().focus().toggleBold().run();
      }
      if (type === "italic") {
        this.editor.chain().focus().toggleItalic().run();
      }
      if (type === "strike") {
        this.editor.chain().focus().toggleStrike().run();
      }
      if (type === "underline") {
        this.editor.chain().focus().toggleUnderline().run();
      }
    },

    handleMenubarNodeToggle(type) {
      if (type === "bulletList") {
        this.editor.chain().focus().toggleBulletList().run();
      }
      if (type === "codeBlock") {
        this.editor.chain().focus().toggleCodeBlock().run();
      }
      if (type === "orderedList") {
        this.editor.chain().focus().toggleOrderedList().run();
      }
    },
  },
};
</script>

<style lang="scss">
.editor-menubar {
  background-color: #eeeff7 !important;
}

.menubar-buttons {
  background-color: #eeeff7 !important;
}

.menubar-buttons.is-active {
  background-color: #cacaca !important;
}

/* Basic editor styles */
.tiptap {
  padding: 0.5rem;
  background-color: #fff;
  overflow-y: scroll;
  max-height: 200px;

  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1rem 0.75rem 1rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: black;
    border-radius: 0.4rem;
    color: white;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: black;
    border-radius: 0.5rem;
    color: white;
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  /* Placeholder (at the top) */
  p.is-editor-empty:first-child::before {
    color: grey;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  /* Placeholder (on every new line) */
  /* .is-empty::before {
    color: var(--gray-4);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  } */
}

.ProseMirror:focus {
  outline: none;
}
</style>
