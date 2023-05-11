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
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    // Providing only a Cloud Name along with an Upload Preset allows you to use the
    // widget without requiring an API Key or Secret. This however allows for
    // "unsigned" uploads which may allow for more usage than intended. Read more
    // about unsigned uploads at: https://cloudinary.com/documentation/upload_images#unsigned_upload

    const options = {
      //   cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, // Ex: mycloudname
      //   uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET, // Ex: myuploadpreset
      cloudName: "dezrrgciy",
      uploadPreset: "wplmb4oz",
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurance
      if (error || result.event === "success") {
        onUpload(error, result, widget);
      }
    });
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
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
