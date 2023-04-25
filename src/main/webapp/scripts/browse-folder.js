//Now, for each file in the folder,
//We write a new div using const newDiv = document.createElement('div');
//Inside that div will be <a class="[folder/file]-icon" href="[FILE_PATH]">[NAME_OF THE FILE/FOLDER]</a>
//Then, we append the div to the body of the document
//Finally, we execute the function
//Example:
/*
        <div class="icon">
            <a class="file-icon" href="[PATH]">[FILE_NAME]</a>
        </div>

        <div class="icon">
            <a class="folder-icon" href="[PATH]">[FOLDER_NAME]</a>
        </div>
*/

function browseFolder() {
  const icons = document.querySelectorAll('.folder-icon, .file-icon');
  icons.forEach(icon => icon.remove());

  const folderPath = '';
  const url = `http://localhost:8080/remotestorage/browseFolder?folderPath=${folderPath}`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const items = data.trim().split('\n');
      for (const item of items) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('icon');
        const newAnchor = document.createElement('a');
        if (item.startsWith('.')) {
          // hidden file
          continue;
        } else if (item.startsWith('folder')) {
          // folder
          newAnchor.classList.add('folder-icon');
          newAnchor.href = folderPath + item + '/';
          newAnchor.onclick = function() { const elements = document.querySelectorAll('.file-icon, .folder-icon');elements.forEach(element => {element.classList.remove('selected');});newAnchor.classList.add('selected'); return false; };
          newAnchor.innerHTML = item;
        } else {
          // file
          newAnchor.classList.add('file-icon');
          newAnchor.href = folderPath + item;
          newAnchor.onclick = function() { const elements = document.querySelectorAll('.file-icon, .folder-icon');elements.forEach(element => {element.classList.remove('selected');});newAnchor.classList.add('selected'); return false; };
          newAnchor.innerHTML = item;
        }
        newDiv.appendChild(newAnchor);
        document.body.appendChild(newDiv);
      }
    })
    .catch(error => console.error(error));

}