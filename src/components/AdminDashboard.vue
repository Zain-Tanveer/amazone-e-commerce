<template>
  <div class="h-100">
    <div ref="messageArea" class="message-area overflow-x-hidden overflow-y-auto scrollbar-hidden">
      <h3>chat</h3>
      <v-divider></v-divider>
      <v-list dense three-line>
        <v-list-item
          dense
          class="message-display px-0 mb-2 mr-1 rounded"
          v-for="message in messages"
          :key="message.id"
        >
          <!-- user image -->
          <v-list-item-avatar
            class="cursor-pointer mt-3"
            height="30"
            width="30"
            min-width="0"
            rounded="circle"
            v-if="message.image"
          >
            <v-img :src="message.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-avatar
            class="amber cursor-pointer mt-3"
            height="30"
            width="30"
            min-width="0"
            rounded="circle"
            v-else
          >
            <span class="white--text font-weight-bold">ZT</span>
          </v-list-item-avatar>

          <v-list-item-content class="d-flex align-start">
            <div class="d-flex justify-space-between">
              <!-- user name and time -->
              <div class="d-flex">
                <strong class="cursor-pointer">{{ message.userFullName }}</strong>
                <p class="text--secondary ml-5 mb-2">
                  <small>7 days ago</small>
                </p>
              </div>
            </div>

            <div>
              <v-card flat outlined class="message-options d-none mr-3">
                <div class="d-flex pa-1">
                  <v-tooltip bottom v-for="button in buttons" :key="button.text">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        tile
                        depressed
                        x-small
                        min-height="0"
                        min-width="0"
                        class="rounded-circle white px-1 py-3"
                        v-on="on"
                        v-bind="attrs"
                      >
                        <v-icon small>{{ button.icon }}</v-icon>
                      </v-btn>
                    </template>
                    <span class="text-body-2">{{ button.text }}</span>
                  </v-tooltip>

                  <v-btn
                    tile
                    depressed
                    x-small
                    min-height="0"
                    min-width="0"
                    class="rounded-circle white px-1 py-3"
                    @click="showMessageOptionsMenu($event, message, true)"
                  >
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </div>
              </v-card>

              <!-- message text -->
              <span
                @click="showMessageOptionsMenu($event, message)"
                class="message cursor-pointer text-body-2 rounded py-1 px-2"
                v-html="message.text"
              ></span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-menu :value="showMenu" :position-x="x" :position-y="y" absolute offset-y>
        <v-list>
          <v-list-item
            dense
            link
            v-for="item in messageDropdownItems"
            :key="item.text"
            @click="handleMessageDropdownClick(item)"
          >
            <v-list-item-icon class="mr-1">
              <v-icon small>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-body-2">{{
                item.text
              }}</v-list-item-title>
            </v-list-item-content>
            <div class="ml-10">
              <v-chip class="helper-chip me-1 black" x-small label> ⌘ </v-chip>
              <v-chip class="helper-chip black" x-small label> {{ item.helper }} </v-chip>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <message-delete-dialog
      :message="currentMessage"
      :loading="deleteLoading"
      v-model="showDeleteDialog"
      @close-dialog="showDeleteDialog = false"
      @delete-message="handleDelete"
    />
  </div>
</template>

<script>
export default {
  components: {
    MessageDeleteDialog: () => import("@/components/MessageDeleteDialog.vue"),
  },

  mounted() {
    this.scrollToBottom();
  },

  data: () => ({
    deleteLoading: false,
    showDeleteDialog: false,

    currentMessage: {},

    messages: [
      {
        id: 20000,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20001,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20002,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20003,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20004,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20005,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20006,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20007,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
      {
        id: 20008,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      },
    ],

    showMenu: false,
    x: 0,
    y: 0,

    messageDropdownItems: [
      { text: "Copy", icon: "mdi-content-copy", helper: "G" },
      { text: "Edit", icon: "mdi-pencil-outline", helper: "E" },
      { text: "Delete", icon: "mdi-delete-outline", helper: "D" },
      { text: "Forward", icon: "mdi-arrow-right-top", helper: "H" },
      { text: "Reply", icon: "mdi-arrow-left-bottom", helper: "J" },
    ],

    buttons: [
      { text: "Emoji", icon: "mdi-emoticon-happy-outline" },
      { text: "Copy message text", icon: "mdi-content-copy" },
      { text: "Pin to channel", icon: "mdi-pin-outline" },
    ],
  }),

  methods: {
    addMessage() {
      const message = {
        id: 20000,
        userId: 10000,
        userFullName: "Zain Tanveer",
        text: "This is a newly created message",
        createdAt: new Date(),
        channelId: 3000,
        user_image: "",
      };

      this.messages.push(message);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    handleMessageDropdownClick() {
      console.log("triggered", this.currentMessage);
      this.handleDeleteClick();
    },

    /**
     * Function handle click of delete in delete product dialog
     *
     * @param {Number | String} message - Contains the product id
     * @returns {void}
     */
    async handleDelete(message) {
      this.deleteLoading = true; // sets the loading property to true

      console.log("delete", message);
      // function passed as parameter to delete api call
      // const done = (res) => {
      //   if (res?.status === 200) {
      //     this.removeProduct(res.data.id); // removes the product from currently listed products array
      //     this.SET_SNACKBAR({ message: "Product deleted successfully!", type: "success" });
      //   } else {
      //     this.SET_SNACKBAR({ message: "Something went wrong!", type: "error" });
      //   }
      // };

      // api call to delete the product
      // await API.delete(`/products/${product_id}`, done);

      this.deleteLoading = false;
      this.showDeleteDialog = false;
    },

    /**
     * Function handle delete product icon click.
     * Used to open the delete dialog box.
     *
     * @param {Object} product - Contains the product that is clicked
     * @returns {void}
     */
    handleDeleteClick() {
      this.showDeleteDialog = true;
    },

    scrollToBottom: function () {
      const container = this.$refs.messageArea;
      container.scrollTop = container.scrollHeight;
    },

    showMessageOptionsMenu(e, message, isDropdownIcon) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;

      if (isDropdownIcon) {
        this.x = this.x - 100;
      }

      this.currentMessage = message;

      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
  },
};
</script>
<style style>
.message-area {
  background-color: #f9f9fc !important;
  height: calc(100vh - 200px);
}

.message-display {
  min-height: 0 !important;
  position: relative;
}

.message-display:hover {
  background-color: #eeeff7;
}

.message-display:hover .message-options {
  display: block !important;
}

.h-100 {
  height: 100% !important;
}

.message-options {
  float: right !important;
  margin-top: -35px;
}

.message p {
  margin-bottom: 0.25rem !important;
}

.cursor-pointer {
  cursor: pointer !important;
}

.helper-chip {
  color: #fff !important;
  font-size: 10px !important;
  padding: 2px 4px !important;
  line-height: 0;
}
</style>
