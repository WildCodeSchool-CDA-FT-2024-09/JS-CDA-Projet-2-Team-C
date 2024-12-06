import { FileListProps } from './FileList.types';

// in the future this component can be converted in a file uploader as well
export default function FileList({ files }: FileListProps) {
  const id = 2;

  return (
    <>
      <label htmlFor={`consultation-${id}-files`}>Fichiers associés</label>
      <ul
        id={`consultation-${id}-files`}
        className="flex-grow rounded bg-white p-1"
      >
        {files?.map((file) => (
          <li key={`file-${file.id}`}>
            <div className="card h-36 w-36 rounded bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://imgs.search.brave.com/O7gW6bMXXWkEkyezEqDGTJcO_re6iEkxFW5L2-IW1k0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9waG90/by1vcnRob3AlQzMl/QTlkaXF1ZS1kLW9z/LWRlLXBpZWQtZGUt/cmF5b24teC0yOTc0/MDAwNS5qcGc"
                  alt={file.note}
                />
              </figure>
              <div className="card-body p-2">
                <p>{file.fileDisplayName}</p>
              </div>
            </div>
          </li>
        ))}
        {files.length === 0 && 'Aucun'}
      </ul>
    </>
  );
}
