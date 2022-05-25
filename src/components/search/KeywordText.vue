<script>
export default {
  name: "KeywordText",
  props: {
    keyword: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      required: true,
    },
  },
  render(h) {
    const vnodes = [];
    const text = this.text.split(this.keyword);
    text.forEach((str) => {
      vnodes.push(h("span", null, str));
      vnodes.push(h("span", { style: "color: #1890ff" }, this.keyword));
    });
    if (text.length > 0) {
      vnodes.pop();
    }
    return h("span", null, vnodes);
  },
};
</script>