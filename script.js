function generateMarkup() {
  const taskInput = document.getElementById('taskInput').value;
  console.log(taskInput);

  const lines = taskInput.split('\n');
  let outputHTML = '<table>';

  let bannerUrl = '';
  let buttonText = '';
  let buttonLink = '';
  let title = '';
  let text = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('Макет')) {
      for (let j = i + 1; j < lines.length; j++) {
        const match = lines[j].match(/https:\/\/\S+/);
        if (match) {
          bannerUrl = match[0];
          break;
        }
      }
      outputHTML += `
        <tr>
          <td class="banner" style="padding: 0; padding-bottom: 36px; font-size: 0; line-height: 0; text-align: center;">
            <a href="${bannerUrl}">
              <img src="#" width="660" height="280" style="width: 100%; max-width: 660px; height: auto; max-height: 280px;" alt="">
            </a>
          </td>
        </tr>
      `;
    } else if (line.startsWith('Кнопка:')) {
      buttonText = line.split(' ')[1];
      buttonLink = lines[i + 1].trim();
      outputHTML += `
        <tr>
          <td style="padding: 0; padding-bottom: 60px; text-align: center;">
            <div>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${buttonLink}" style="height:50px;v-text-anchor:middle;width:280px;" stroke="f" fillcolor="#B12535">
                <w:anchorlock/>
                <center>
              <![endif]-->
              <a href="${buttonLink}" target="_blank" style="background-color: #B12535; color: #ffffff; display: inline-block; font-family: 'Segoe UI', 'Arial', sans-serif; font-size: 16px; font-weight: 600; line-height: 50px; text-align: center; text-decoration: none; width: 280px; text-transform: uppercase; border-radius: 4px; -webkit-text-size-adjust: none;">
                ${buttonText}
              </a>
              <!--[if mso]>
                </center>
              </v:roundrect>
              <![endif]-->
            </div>
          </td>
        </tr>
      `;
    } else if (line.startsWith('https://')) {
      continue; // Skip URLs, they are handled above
    } else if (line.startsWith('Заголовок:')) {
      title = line.split('Заголовок: ')[1];
    } else if (line.startsWith('Текст:')) {
      text = line.split('Текст: ')[1];
      outputHTML += `
      <tr>
      <td style="padding: 0; padding-bottom: 18px; padding-left: 9%; padding-right: 9%; text-align: center;">
        <span
          style="font-family: 'Roboto', 'Segoe UI', Arial, sans-serif; font-size: 36px; line-height: 1.2; color: #272727; font-weight: 700;">
          ${title}
        </span>
      </td>
    </tr>
        <tr>
          <td style="padding: 0; padding-bottom: 41px; padding-left: 9%; padding-right: 9%; text-align: left;">
            <span style="font-family: 'Roboto', 'Segoe UI', Arial, sans-serif; font-size: 18px; line-height: 1.6; color: #272727; font-weight: 300;">
              ${text}
            </span>
          </td>
        </tr>
      `;
    }
  }

  outputHTML += '</table>';

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = outputHTML;
}
