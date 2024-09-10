import React, {
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";
import "../../assets/css/DragDrop.css";

const DragDrop = (props) => {
  const [initialFiles, setInitialFiles] = useState([]); // initialFiles를 props로 받습니다
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const dragRef = useRef(null);
  const fileId = useRef(0);

  useEffect(() => {
    setInitialFiles(props.initialFiles);
  }, [props.initialFiles]);

  const onChangeFiles = useCallback(
    (e) => {
      let selectFiles = [];
      let tempFiles = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file
          }
        ];
      }

      setFiles(tempFiles);
      props.addFiles(tempFiles);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id) => {
      setFiles(files.filter((file) => file.id !== id));
    },
    [files]

  );
/////////////////////////////////////////////////////////
  const delhandle = useCallback((id) => {
    console.log(id);
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);


  return (
    <div className="DragDrop">
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={true}
        onChange={onChangeFiles}
      />

      <div style={
        {
          'display': 'flex',
          'width': '400px',
          'justify-content': 'center',
          'margin-bottom': '1rem'
        }
      }>
        {
          initialFiles.map((v) => {
            return (
              <div  style={{ 'display': 'flow' }}>
                <img width='120px' height='120px' 
                 src={`http://localhost:8080/pro/download?id=${v.id}`}></img>
                <div style={{ 
                  'display': 'flex', 
                  'alignItems': 'center',
                  'margin-right': '20px',
                  'width': '120px',
                  'height': '30px',
                  'border': '1px solid black', 
                  'justifyContent': 'center'
                }}
                  className="DragDrop-Files-Filter"
                  onClick={() => {
                    delhandle(v.id);
                    props.onDeleteImage(v.id);
                  }}
                >
                  X
                </div>
              </div>
            );
          })
        }
      </div>
      <label
        className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
        htmlFor="fileUpload"
        ref={dragRef}
      >
        <div>파일 첨부</div>
      </label>


      <div className="DragDrop-Files">
        {files.length > 0 &&
          files.map((file) => {
            const { id, object: { name } } = file;

            return (
              <div key={id}>
                <div>{name}</div>
                <div
                  className="DragDrop-Files-Filter"
                  onClick={() => handleFilterFile(id)}
                >
                  X
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DragDrop;
