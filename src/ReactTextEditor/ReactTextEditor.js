import React, { useState, useRef, useEffect } from "react";
import "./ReactTextEditor.css";
// import EmojiComponent from "../../common/EmojiComponent";
import { FaBold,FaItalic,FaUnderline,FaListUl,FaListOl,FaImages,FaFileAlt,FaSmile } from "react-icons/fa";

const ReactTextEditor = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [fileArray, setFileArray] = useState([]);
  const [editImageIndex, setEditImageIndex] = useState(0);
  const [imageUploadError, setImageUploadError] = useState({
    imageErrorMessage: "",
  });

  const [fileUploadError, setFileUploadError] = useState("");

  const [isBold, setIsBold] = useState("false");
  const [isItalic, setIsItalic] = useState("false");
  const [isUnderline, setIsUnderline] = useState("false");
  const [isOrderedList, setIsOrderedList] = useState("false");
  const [isUnorderedList, setIsUnorderedList] = useState("false");
  const detailsRef = useRef(null);
  const contentEditableRef = useRef(null);
  const contentEditableGif = useRef(null);

  if (
    document.getElementById("contentEditableId") !== undefined &&
    document.getElementById("contentEditableId") !== null
  ) {
    document
      .getElementById("contentEditableId")
      .addEventListener("click", () => {
        setIsBold(document.queryCommandValue("Bold"));
        setIsItalic(document.queryCommandValue("Italic"));
        setIsUnderline(document.queryCommandValue("Underline"));
        setIsUnorderedList(document.queryCommandValue("insertUnorderedList"));
        setIsOrderedList(document.queryCommandValue("insertOrderedList"));
      });
  }

  useEffect(() => {
    function handleDetailsOutsideClick(event) {
      if (
        document.getElementById("contentEditableId") !== null &&
        document.getElementById("contentEditableId") !== undefined &&
        document.getElementById("editor-tools") === null &&
        event.target.classList.contains("rte-details-text")
      ) {
        handleTextFieldBlur(event, "details");
      }
    }
    function handleDetailsInput(event) {
      if (
        document.getElementById("contentEditableId") !== null &&
        document.getElementById("contentEditableId") !== undefined
      ) {
      }
    }

    document.addEventListener("input", handleDetailsInput);
    document.addEventListener("focusout", handleDetailsOutsideClick);
    return () => {
      document.removeEventListener("input", handleDetailsInput);
      document.removeEventListener("focusout", handleDetailsOutsideClick);
    };
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (detailsRef.current && detailsRef.current.contains(event.target)) {
        setShowOptions(true);
      } else if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target)
      ) {
        setShowOptions(false);
        if (
          document.getElementById("emojiMart") !== null &&
          document.getElementById("emojiMart") !== undefined
        ) {
          document.getElementById("emojiMart").style.display = "none";
        }
        if (
          contentEditableGif.current !== null &&
          contentEditableGif.current !== undefined
        ) {
          contentEditableGif.current.style.display = "none";
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detailsRef]);

  // useEffect(() => {
  //   console.log(document.getElementById("details"));
  //   // setTimeout(() => {
  //   if (
  //     document.getElementById("contentEditableId") !== null &&
  //     document.getElementById("contentEditableId") !== undefined
  //   ) {
  //     document.getElementById("contentEditableId").innerHTML = "hello";
  //   }
  //   // });
  // }, [isExpanded]);

  const handleCreatePostClick = () => {
    isExpanded ? setIsExpanded(false) : setIsExpanded(true);
  };
  const handleCloseCreatePostClick = () => {
    isExpanded ? setIsExpanded(false) : setIsExpanded(true);
  };
  const handlePickEmojiOrLink = (val) => {
    contentEditableRef.current.focus();

    let emojiOrLink = "";
    if (val === "") {
      let linkURL = prompt("Enter a URL:", "http://");
      let selected = window.getSelection();

      // if (
      //   selected?.anchorNode?.data?.includes("https") ||
      //   selected?.anchorNode?.data?.includes("http")
      // )
      // {
      //   emojiOrLink =
      //     "<span contenteditable='false'><a style='text-decoration:underline'  target='_blank' href='" +
      //     selected +
      //     "'>" +
      //     selected +
      //     "</a></span>";
      // }
      if (linkURL !== null) {
        emojiOrLink =
          "<span contenteditable='false'><a style='text-decoration:underline'  target='_blank' href='" +
          linkURL +
          "'>" +
          linkURL +
          "</a></span>";
      }
    } else {
      emojiOrLink = `<span contenteditable="false" class="emojiiconstyle" name="${val.name}">${val.native}</span>`;
    }

    let sel, range;
    if (window.getSelection && emojiOrLink !== "") {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        let el = document.createElement("div");
        el.innerHTML = emojiOrLink;
        let frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else if (document.selection && document.selection.type != "Control") {
      // IE < 9
      document.selection.createRange().pasteHTML(emojiOrLink);
    }

    // contentEditableRef.current.innerHTML = contentEditableRef.current.innerHTML;
    // this.setState((prevState) => ({
    //   tempDescription: this.contentEditable.current.innerHTML,
    //   descCount: this.countDescriptionText(
    //     this.contentEditable.current.innerHTML
    //   ).length,
    // }));

    // else {
    //   this.setState((prevState) => ({
    //     tempDescription: prevState.tempDescription,
    //   }));
    // }
    // this.notificationModal.current.style.display = "none";
    // setShowEmojiDialog(false);
    document.getElementById("emojiMart").style.display = "none";
  };

  const handleEmojiIconClick = () => {
    document.getElementById("emojiMart").style.display = "block";
  };

  const handlePasteOnContentEditable = (e) => {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData("Text");

    clipboardData.setData(
      "gif",
      document.getElementById("contentEditableId").innerHTML
    );

    if (pastedData !== "") {
      let gifInput = document.getElementById("gifInputId");
      if (gifInput !== null && gifInput !== undefined) {
        gifInput.parentNode.removeChild(gifInput);
      }
    } else {
      document.getElementById("contentEditableId").innerHTML =
        document.getElementById("contentEditableId").innerHTML;
    }
  };

  const handleImageChange = (e, index, replace) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    let file1 = e.target.files[0];
    const fileType = file1["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (validImageTypes.includes(fileType)) {
      if (file1 && file1.size > 10e5) {
        if (replace) {
          props.functionShowSnackBar(
            true,
            "File exceeds maximum limit of 1MB",
            false
          );
        } else {
          setImageUploadError({
            imageErrorMessage: "File exceeds maximum limit of 1MB",
          });
        }
      } else {
        files.forEach((file) => {
          let reader = new FileReader();
          reader.onload = () => {
            let base64 = reader.result.search(",");
            let base = reader.result.slice(base64 + 1);
            let fileInfo = {
              fileName: file.name,
              fileType: file.type,
              filedata: base,
            };
            if (
              imageArray.length > 0 &&
              imageArray.filter((data) => data.filedata === base) &&
              imageArray.filter((data) => data.filedata === base).length > 0
            ) {
              if (replace) {
                props.functionShowSnackBar(
                  true,
                  "cannot add duplicate images",
                  false
                );
              } else {
                setImageUploadError({
                  imageErrorMessage: "cannot add duplicate images",
                });
              }
            } else if (replace === true) {
              let replaceImageArray = [...imageArray];
              replaceImageArray.splice(index, 1, fileInfo);
              setImageArray(replaceImageArray);
            } else {
              setImageArray([...imageArray, fileInfo]);
              setImageCount(imageArray.length + 1);
            }
          };
          reader.readAsDataURL(file);
        });
      }
      e.target.value = "";
    } else {
      if (replace) {
        props.functionShowSnackBar(
          true,
          "Allowed file types: .jpeg, .jpg, .png",
          false
        );
      } else {
        setImageUploadError({
          imageErrorMessage: "Allowed file types: .jpeg, .jpg, .png",
        });
      }
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);

    let file1 = e.target.files[0];
    const fileType = file1["type"];
    const validImageTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
    ];
    if (validImageTypes.includes(fileType)) {
      if (file1 && file1.size > 10e5) {
        // alert("Image cannot exceed 1MB");
        setFileUploadError("File exceeds maximum limit of 1MB");
      } else {
        files.forEach((file) => {
          let reader = new FileReader();

          reader.onload = () => {
            let base64 = reader.result.search(",");
            let base = reader.result.slice(base64 + 1);
            let fileInfo = {
              fileName: file.name,
              fileType: file.type,
              filedata: base,
              fileSize: file.size,
            };
            if (
              fileArray.length > 0 &&
              fileArray.filter((data) => data.filedata === base) &&
              fileArray.filter((data) => data.filedata === base).length > 0
            ) {
              setFileUploadError("Cannot add duplicate files.");
            } else {
              setFileArray([...fileArray, fileInfo]);
              setFileCount(fileArray.length + 1);
            }
          };

          reader.readAsDataURL(file);
        });
      }
      e.target.value = "";
    } else {
      setFileUploadError("Allowed file types: .pdf, .docx, .pptx, .xlxs");
    }
  };

  const handleDeleteImageClick = (index, imageBase64) => {
    let loadedImages = imageArray;
    const imageArrayAfterDel = [...loadedImages].filter((data, imageIndex) => {
      return !(data.filedata === imageBase64 && index === imageIndex);
    });
    setImageArray(imageArrayAfterDel);
    setImageCount(imageArrayAfterDel.length);
  };

  const handleDeleteFileClick = (index, fileBase64) => {
    let loadedFiles = fileArray;
    const fileArrayAfterDel = [...loadedFiles].filter((data, fileIndex) => {
      return !(data.filedata === fileBase64 && index === fileIndex);
    });
    setFileArray(fileArrayAfterDel);
    setFileCount(fileArrayAfterDel.length);
  };

  const handleFontStyleIconClick = (fontStyle) => {
    switch (fontStyle) {
      case "bold":
        setIsBold(isBold === "true" ? "false" : "true");
        break;
      case "underline":
        setIsUnderline(isUnderline === "true" ? "false" : "true");
        break;
      case "italic":
        setIsItalic(isItalic === "true" ? "false" : "true");
        break;
      case "insertOrderedList":
        setIsOrderedList(isOrderedList === "true" ? "false" : "true");
        setIsUnorderedList("false");
        break;
      case "insertUnorderedList":
        setIsUnorderedList(isUnorderedList === "true" ? "false" : "true");
        setIsOrderedList("false");
        break;
      default:
        break;
    }
    document.execCommand(fontStyle, false, null);
  };

  const handleValueChange = (e, fieldName) => {};

  const handleTextFieldBlur = (event, fieldName) => {
    //On blur of Div.
  };

  const handleDropdownChange = (field, value) => {};

  return (
    <div className="rte-expanded">
      <div className="rte-expanded-input-text">
        <label for="title" className="input-label">
          Details<span>*</span>
        </label>
        <div
          className={`rte-text-editor-tools-text ${
            showOptions ? "active" : ""
          }`}
          ref={detailsRef}
          spellCheck={false}
          id="details"
          // onBlur={(e) => handleTextFieldBlur(e, "details")}
        >
        
         

          {showOptions && (
            <div className="rte-text-editor-tools" id="editor-tools">
             
              {props?.options?.includes("bold") && <FaBold 
                onClick={() => {
                  handleFontStyleIconClick("bold");
                }}
                // src={isBold === "true" ? "boldSelected" : "bold"}
                alt=""
                className="rte-tools-icon"
              />}

              {/* <img
                onClick={() => {
                  // handleFontStyleIconClick("bold");
                  handlePickEmojiOrLink("");
                  // handlePromptClick();
                  // console.log(selected);
                }}
                src={isBold === "true" ? "Images.boldSelected" : "Images.bold"}
                alt=""
                className="rte-tools-icon"
              /> */}
             {props?.options?.includes("italic") && <FaItalic
                onClick={() => {
                  handleFontStyleIconClick("italic");
                }}
                src={
                  isItalic === "true"
                    ? "Images.italicSelected"
                    : "Images.italic"
                }
                alt=""
                className="rte-tools-icon"
              />}
              {props?.options?.includes("underline") && <FaUnderline
                onClick={() => {
                  handleFontStyleIconClick("underline");
                }}
                src={
                  isUnderline === "true"
                    ? " Images.underlineSelected"
                    : "Images.underline"
                }
                alt=""
                className="rte-tools-icon"
              />}
              {props?.options?.includes("unorderList") &&<FaListUl
                onClick={() => {
                  handleFontStyleIconClick("insertUnorderedList");
                }}
                src={
                  isUnorderedList === "true"
                    ? "Images.unorderedSelected"
                    : "Images.unorderedList"
                }
                alt=""
                className="rte-tools-icon"
              />}
              {props?.options?.includes("orderList") &&<FaListOl
                onClick={() => {
                  handleFontStyleIconClick("insertOrderedList");
                }}
                src={
                  isOrderedList === "true"
                    ? "Images.orderedSelected"
                    : "Images.orderedList"
                }
                alt=""
                className="rte-tools-icon"
              />}

              {/* <img
                onClick={() => {
                  let showGif =
                    document.getElementById("contentEditableId").innerHTML;
                  !showGif.includes("gifInputId") && fnShowGifs();
                }}
                src={"Images.gifIcon"}
                alt=""
                className="rte-tools-icon"
              /> */}
             {props?.options?.includes("emoji") && <FaSmile
                onClick={() => handleEmojiIconClick()}
                src={"Images.emojiIcon"}
                alt=""
                className="rte-tools-icon"
              />}
              {props?.options?.includes("file") &&
              <div className="rte-tools-icon">
                <label className="icon-input-label" for="file-input">
                  <FaFileAlt
                    style={{ cursor: "pointer" }}
                    src={
                      fileCount >= 6 || fileUploadError !== ""
                        ? "Images.fileIconDisabled"
                        : "Images.uploadFileIcon"
                    }
                    alt=""
                  />
                </label>

                <input
                  style={{ cursor: "pointer", display: "none" }}
                  type="file"
                  id="file-input"
                  disabled={(fileCount >= 6 || fileUploadError !== "") && true}
                  name="myfile"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>}
             {props?.options?.includes("img") && <div className="rte-tools-icon">
                <label className="icon-input-label" for="image-input">
                  <FaImages
                    style={{ cursor: "pointer" }}
                    src={
                      imageCount >= 4 ||
                      imageUploadError.imageErrorMessage !== ""
                        ? "Images.imageIconDisabled"
                        : "Images.uploadImageIcon"
                    }
                    alt=""
                  />
                </label>

                <input
                  style={{ cursor: "pointer", display: "none" }}
                  type="file"
                  id="image-input"
                  disabled={
                    (imageCount >= 4 ||
                      imageUploadError.imageErrorMessage !== "") &&
                    true
                  }
                  name="myimg"
                  onChange={(e) => handleImageChange(e, -1, false)}
                />
              </div>}
            </div>
          )}
          <div
            contentEditable="true"
            className="rte-details-text"
            id="contentEditableId"
            data-placeholder="Enter Details"
            onPaste={(e) => handlePasteOnContentEditable(e)}
            ref={contentEditableRef}
            style={{ fontSize: "16px" }}
            // onBlur={(e) => handleTextFieldBlur(e, "details")}
          ></div>
          <div className="rte-details-emoji-mart" id="emojiMart">
            {/* <EmojiComponent
              onSelect={(emoji) => handlePickEmojiOrLink(emoji)}
            /> */}
          </div>
          {/* <div className="rte-details-gif" id="gifId"> */}

          {/* </div> */}
        </div>
      </div>

      {/* To Showing Uploaded images */}
      {(imageCount > 0 || imageUploadError.imageErrorMessage !== "") && (
        <div className="rte-uploaded-images-main-container">
          <p className="rte-uploaded-images-count">
            Images: {imageCount}/4 added
          </p>
          <div className="rte-uploaded-images-container">
            {imageArray.map((file, index) => {
              return (
                <div className="rte-uploaded-images">
                  <img
                    className="rte-single-image"
                    src={`data:${file.fileType};base64,${file.filedata}`}
                    alt=""
                  />
                  <div className="rte-image-edit-delete-icons">
                    <label for="edit-image-input" style={{ cursor: "pointer" }}>
                      <img
                        className="rte-image-edit-icon"
                        src={"Images.editImageIcon"}
                        alt=""
                        // onClick={() => handleEditImageClick(index, file.filedata)}
                        onClick={(e) => setEditImageIndex(index)}
                      />
                    </label>
                    <input
                      style={{ cursor: "pointer", display: "none" }}
                      type="file"
                      id="edit-image-input"
                      // disabled={this.state.uploadDisabled}
                      name="myfile"
                      onChange={(e) =>
                        handleImageChange(e, editImageIndex, true)
                      }
                    />

                    <img
                      className="rte-image-delete-icon"
                      src={"Images.deleteImageIcon"}
                      alt=""
                      onClick={() =>
                        handleDeleteImageClick(index, file.filedata)
                      }
                    />
                  </div>
                </div>
              );
            })}
            {imageUploadError.imageErrorMessage !== "" && (
              <div className="rte-image-upload-error-container">
                <img
                  className="image-error-close"
                  src={"Images.fileUploadCloseIcon"}
                  alt=""
                  onClick={() => {
                    setImageUploadError({
                      imageErrorMessage: "",
                    });
                  }}
                />
                <div className="image-error-alert-text">
                  <img
                    className="image-error-alert"
                    src={"Images.fileUploadAlertIcon"}
                    alt=""
                  />
                  <p className="image-error-text">
                    {imageUploadError.imageErrorMessage}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {(fileCount > 0 || fileUploadError !== "") && (
        <div className="rte-uploaded-files-main-container">
          Files: {fileCount}/6 added
          <div className="rte-uploaded-files-container">
            {fileArray.map((file, index) => {
              let fileIcon;
              if (file.fileType.includes("presentation")) {
                fileIcon = "Images.powerpointIcon";
              } else if (file.fileType.includes("pdf")) {
                fileIcon = "Images.pdfIcon";
              } else if (file.fileType.includes("sheet")) {
                fileIcon = "Images.excelIcon";
              } else {
                fileIcon = "Images.wordIcon";
              }
              return (
                <div className="rte-uploaded-files">
                  <div className="rte-single-file">
                    <img
                      className="rte-single-file-icon"
                      src={fileIcon}
                      alt=""
                    />
                    <div className="rte-single-file-name-size">
                      <p className="rte-single-file-name">{file.fileName}</p>
                      <p className="rte-single-file-size">
                        {Math.floor(file.fileSize / 1024)} KB
                      </p>
                    </div>
                    <img
                      className="rte-single-file-close-icon"
                      src={"Images.closeIcon"}
                      alt=""
                      onClick={() =>
                        handleDeleteFileClick(index, file.filedata)
                      }
                    />
                  </div>
                </div>
              );
            })}

            {fileUploadError !== "" && (
              <div className="rte-file-error">
                <img
                  className="file-alert-icon"
                  src={"Images.fileUploadAlertIcon"}
                  alt=""
                />
                <div className="file-error-text">{fileUploadError}</div>
                <img
                  className="file-error-close"
                  src={"Images.fileUploadCloseIcon"}
                  onClick={() => setFileUploadError("")}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ReactTextEditor;
