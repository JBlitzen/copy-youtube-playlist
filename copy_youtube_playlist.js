//	Set the four variables below, or just the first one to add every video.
//	Then load the playlist view in Youtube, for instance https://www.youtube.com/playlist?list=PLeV2aLWUK1zpS-QrT5pSL1MQ3I5pDJkNe
//	Make sure you scroll to the last video you want to import and then scroll up again, because the script will stop at the last visible video.
//	Then open the dev console with F12 and copy paste this entire script, comments included, to the console input line.  It will fit.
//	Then hit enter to run it.
//	TEST WITH A SUBSET OF 2 OR 3 VIDEOS FIRST.
//	The script clicks the checkbox for the specified playlist if it's not already checked.  It will skip videos that are already in the playlist.

playlist_to_add_to = "MST3K - Mystery Science Theater 3000 - Complete as of March 8 2023"; // The playlist must exist and have this exact name in the save-to-playlist popup.
video_to_start_at = 0; // Leave 1 to start at the first video.
video_to_stop_at = 0; // Leave 0 to import every video, or the number of the last video you want to import.
step_interval = 400; // Increase this if you get errors, Youtube or your computer may be slow to respond.

videos = document.querySelectorAll('ytd-playlist-video-renderer.ytd-playlist-video-list-renderer');
current_video = video_to_start_at - 1;
total_videos = videos.length;
if (video_to_stop_at > 0) total_videos = video_to_stop_at - 1;
function process_next_video() {
	if (current_video >= total_videos) return;
	video = videos[current_video];
	modal_button = video.querySelectorAll("yt-icon-button")[0];
	modal_button.click();
	setTimeout(click_save_to_playlist, step_interval);
}
function click_save_to_playlist() {
	////	modal_popup = document.querySelectorAll("iron-dropdown.ytd-popup-container")[0];
	//modal_popup = document.querySelectorAll(".style-scope.ydt-app > .tp-yt-iron-dropdown")[0];
	//modal_listbox_wrapper = modal_popup.querySelectorAll(".ytd-popup-container")[0];
	////	modal_listbox = modal_popup.querySelectorAll("ytd-popup-container > iron-dropdown.ytd-popup-container paper-listbox")[0];
	//modal_listbox = modal_listbox_wrapper.querySelectorAll(".style-scope.ytd-menu-popup-renderer")[0];
	////	save_to_playlist_button = modal_listbox.childNodes[3];
	//save_to_playlist_button = modal_listbox.querySelectorAll("ytd-menu-service-item-renderer.ytd-menu-popup-renderer")[2];
	save_to_playlist_button = document.querySelectorAll("tp-yt-paper-item.ytd-menu-service-item-renderer")[2];
	save_to_playlist_button.style.backgroundColor = "#ffff00";
	save_to_playlist_button.click();
	setTimeout(click_playlist, step_interval);
}
function click_playlist() {
	playlists = document.querySelectorAll(".ytd-popup-container > #playlists > ytd-playlist-add-to-option-renderer > tp-yt-paper-checkbox yt-formatted-string.checkbox-height");
	playlist = Array.from(playlists).find(p => p.innerHTML == playlist_to_add_to);
	playlist_row = playlist.parentNode.parentNode.parentNode.parentNode;
	playlist_checkbox = playlist_row.querySelectorAll(".checked");
	if (playlist_checkbox.length > 0)
	{
		console.log("Video " + (current_video + 1) + " NOT added to " + playlist.innerHTML + ", it's already there.");
	}
	else
	{
		playlist_row.click();
		console.log("Video " + (current_video + 1) + " added to " + playlist.innerHTML);
	}
	setTimeout(close_backdrop, step_interval);
}
function close_backdrop() {
	overlay_backdrop = document.querySelectorAll("tp-yt-iron-overlay-backdrop")[0];
	overlay_backdrop.click();
	current_video++;
	process_next_video();
}
process_next_video();
