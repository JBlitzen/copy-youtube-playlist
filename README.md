# Copy Youtube Playlist
Need to copy parts or all of any Youtube playlist to another playlist of your own?

Here's a simple script to do so.

# Usage
First, save "copy_youtube_playlist.js" locally.  Do not run it locally, it won't do anything.  But open it in a code or text editor and adjust the settings listed in the next section below.  Also review the code to ensure it's not malicious.  Consult the **Safety** section down below for instructions.

Then, in Firefox or Chrome, create or open the DESTINATION playlist you want to add the videos TO.

In a second tab or window, open the SOURCE playlist you want to add the videos FROM.

Carefully consider the order in which you want to add videos.  My script runs sequentially, adding each SOURCE video in the order it appears on the SOURCE page, as if you were adding each video manually to the DESTINATION playlist according to the DESTINATION playlist's settings.

So if the DESTINATION is set to add videos to the top of the playlist, this script will add the first video shown in the SOURCE playlist page to the top of the DESTINATION.  But then it will add the second video from the SOURCE to the top as well, ABOVE the first video, reversing their order in the SOURCE playlist, just as if you did it manually row by row.  Use the SOURCE playlist's Sort option, and the DESTINATION playlist's add-to-top setting, to change or reverse these orders as needed.

Then, in the SOURCE playlist tab, hit F12 to open debugging tools and open the Console.  Copy paste the entire contents of "copy_youtube_playlist.js" into the console, and hit enter.  This will paste fine even though it's quite a few lines.

Then wait while it runs.  If there are no errors, it will copy one video about every half a second.  Any faster and Youtube may not respond fast enough to its instructions.

# Settings
The script has four configuration variables at the top:

*playlist_to_add_to* - This needs to be the exact name of your DESTINATION playlist as it appears in the "save to playlist" popup, which may not be the exact name of the actual playlist.  It's looking for the exact text in that popup.

*video_to_start_at* - This is the sequential number of the video you want to start at, in the order they appear on the SOURCE page.  Usually 0, but sometimes you may only want a later part of a playlist, or if an error occurred midway through a copy you can skip the early videos.

*video_to_end_at* - This is the sequential number of the video you want to stop at, in the order they appear on the SOURCE page.  0 to copy every visible video on the page.  RECOMMENDED that you set this to 2 or 3 to test with until you're comfortable with how the script works and the order it does things in.  You can just manually remove the videos again to test again.

*step_interval* - RECOMMENDED that you leave this at 400.  That's the number of milliseconds the script waits after any click to give Youtube time to respond.  That's about as fast as I can run the script reliably without Youtube responding a little too slowly and causing an error.  

# How it works
The script really does emulate the process of manually opening options for each video shown on the page, clicking the Save to Playlist option on that popup, finding the playlist we want to add it to, and clicking the checkbox for that playlist if it's not already clicked.

The script does this by using queries against Youtube's DOM to find the various rows and buttons involved and then clicking them in the right order.

The couple second time each video takes is because the script is giving Youtube time to respond to each new click and operation.

Specifically:

For each video shown on the SOURCE page, the script calls "process_next_video" on it.

In "process_next_video", it finds and clicks the options icon button for the current video row and calls "click_save_to_playlist".

In "click_save_to_playlist", the script finds and clicks the "Save to Playlist" button, which currently is the third button on that popup, referenced as [2] since the result of querySelectorAll is 0-based.  Then it calls "click_playlist".

In "click_playlist", it looks for each checkbox shown on the resulting popup, and loops through them until it finds one associated with the exact playlist name specified.  If that checkbox is not clicked, it clicks it.  Then it calls "close_backdrop".

In "close_backdrop", it closes the popups by clicking the backdrop, then it increments the current video row and calls the "process_next_video" again.

There may be an automated API to perform all this, but I haven't heard of one.

# Tweaks
If you'd like to remove videos instead, or otherwise change the exact behavior of clicking, you can tweak the logic in "click_playlist" around the "playlist_row.click()" line.  I originally clicked the checkbox no matter what, which of course UNCHECKED the box if it was already checked, removing the video.  This might be desired in some cases.


# Safety
Please have this code reviewed by a Javascript programmer before you use it.  I assure you it's harmless and won't do anything malicious, but you should not trust me or any other code author.  The way this script works could conceivably allow it to execute malicious operations against your Youtube account.  And it's difficult without programming knowledge to verify that it's not doing so because there's no human readable way to reference elements on the Youtube page.

For programmers, the biggest safety risk is that I'm using arcane selectors in "querySelectorAll" calls, which might be concealing references to other elements on the page, like account details.

Those are passive calls so they're pretty easy to test.  You can mostly just take each call in isolation and run it in the console with a variable assignment to verify exactly which nodes it's targeting.

For instance, the script uses this call to select all videos:

    document.querySelectorAll('ytd-playlist-video-renderer.ytd-playlist-video-list-renderer');

If you run it with a simple variable assignment like this:

    x = document.querySelectorAll('ytd-playlist-video-renderer.ytd-playlist-video-list-renderer');

Firefox's console will show you a syntax highlighted list of nodes, one for each video visible on the page, which you can mouseover in the console to highlight each row in order and see that they are exactly the nodes they should be.

process_next_video clicks the yt-icon-button for one of those rows, which you can verify pretty easily.

To test later functions in the sequence, just manually emulate the steps the code would have done to that point, thus clicking the button, or clicking "Save to Playlist", and then testing the new query call in the console.

So to test the last call, in click_playlist:

    document.querySelectorAll(".ytd-popup-container > #playlists > ytd-playlist-add-to-option-renderer > tp-yt-paper-checkbox yt-formatted-string.checkbox-height");

First click the options icon button for one of the videos shown on the page, then click Save to Playlist, then add a variable assignment to that call and run it this way in console:

    x = document.querySelectorAll(".ytd-popup-container > #playlists > ytd-playlist-add-to-option-renderer > tp-yt-paper-checkbox yt-formatted-string.checkbox-height");

It should return a list of each playlist name's text node.  The script finds one that matches *playlist_to_add_to* and then jumps up a few parentNode's to select the row it's in so it can find the checkbox in that row.

# Troubleshooting
Youtube periodically updates their DOM a little, which may break this code since it tries to identify page elements without a lot of help from the page itself.  Any errors are probably the result of a changed DOM, and you can let me know or try to fix it yourself, I'll happily pull any such fixes into this repo or you can copy it to a new one.  MIT license so feel free.

# License
MIT.  I'd appreciate attribution but it's not required.  Use as you please.  I accept no responsibility for anything ever.

# Author
Just a person who enjoys Youtube playlists and wanted more control over them.
