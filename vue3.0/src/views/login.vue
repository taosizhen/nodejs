<template>
  <div>
    <Button type="primary">Primary</Button>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class Login extends Vue {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  }
}
</script>
<style lang="less">
</style>