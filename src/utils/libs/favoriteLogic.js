import { isPostSaved, removePost, savePost } from "./logic";

export const favoriteLogic = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const saveButtons = document.querySelectorAll("button[data-saveid]");
    const saveIcon = `<svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8332 0.348087L10.8389 0.850819L10.9098 0.850008C11.2681 0.851182 11.5939 0.977207 11.8204 1.17494C12.0433 1.36943 12.1463 1.60898 12.15 1.83348V19.1721L7.04825 14.8728L6.50054 14.4112L5.9528 14.8727L0.85 19.1723V1.91959L0.850939 1.83653C0.853487 1.61107 0.956377 1.37 1.18049 1.1745C1.40699 0.976922 1.73263 0.851049 2.09075 0.850007L2.15757 0.850813L2.15757 0.850875H2.16783H10.8292H10.8332V0.348087Z" stroke="white" stroke-width="1.7"/>
</svg>`;
    const deleteIcon = `<svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8332 0.500875V0.348064L10.8349 0.500842L10.9083 0.500003C11.3463 0.500812 11.7559 0.654066 12.0506 0.911238C12.3431 1.16659 12.4955 1.4988 12.5 1.83091V19.9248L6.8227 15.1404L6.50052 14.8689L6.17832 15.1404L0.5 19.9249V1.91762L0.500961 1.83257C0.504723 1.49974 0.657101 1.16661 0.950414 0.910752C1.24506 0.653726 1.6546 0.50064 2.09248 0.500002L2.16179 0.500839L2.16179 0.500875H2.16783H10.8292H10.8332Z" fill="#FF1850" stroke="#F11047"/>
</svg>`;

    if (saveButtons.length > 0) {
      saveButtons.forEach((button) => {
        const postId = button.getAttribute("data-saveid");

        button.innerHTML = isPostSaved(postId) ? deleteIcon : saveIcon;

        button.addEventListener("click", (event) => {
          const postId = event.currentTarget.getAttribute("data-saveid");
          const postTitle = event.currentTarget.getAttribute("aria-label");

          if (isPostSaved(postId)) {
            removePost(postId);
            event.currentTarget.innerHTML = saveIcon;
          } else {
            savePost(postId, postTitle);
            event.currentTarget.innerHTML = deleteIcon;
          }
        });
      });
    }
  });
};

export default favoriteLogic;
