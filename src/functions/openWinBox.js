/** @param {import("winbox").Params} params */
export async function openWinBox(params) {
  const { default: WinBox } = await import("winbox");

  new WinBox({
    x: "center",
    y: "center",
    width: "60%",
    height: "60%",
    background: "#303337",
    top: 0,
    class: ["no-full"],
    ...params,
  });
}
