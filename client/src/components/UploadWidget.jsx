import { useEffect } from "react";

let cloudinary;
let widget;

const UploadWidget = ({ children, onUpload }) => {
  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders

    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    function onIdle() {
      if (!widget) {
        widget = createWidget();
      }
    }

    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    // eslint-disable-next-line
  }, []);

  /**
   * createWidget
   Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    const options = {
      cloudName: "dezrrgciy",
      uploadPreset: "wplmb4oz",
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      if (error || result.event === "success") {
        onUpload(error, result, widget);
      }
    });
  }

  /**
   * open
  When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if (!widget) {
      widget = createWidget();
    }
    widget && widget.open();
  }

  return <>{children({ cloudinary, widget, open })}</>;
};

export default UploadWidget;
