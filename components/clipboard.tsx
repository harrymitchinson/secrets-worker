import React from "react";
import toast from "react-hot-toast";
import Toast from "./toast";

export const copyToClipboard = (name: string, value: string) => async () => {
  const { state } = await window.navigator.permissions.query({ name: "clipboard-write" });
  if (state === "denied") {
    return
  }

  await window.navigator.clipboard.writeText(value)
  toast.custom(
    ({ id, visible }) => (<Toast id={id} visible={visible}>Copied {name} to clipboard</Toast>),
    { id: value, position: "bottom-center", duration: 2000 }
  )
}