# Copy Youtube Playlist
Need to copy parts or all of a Youtube playlist?

Here's a simple script to do so.

# Usage
Start by creating or opening the DESTINATION playlist you want to add the videos TO.

In a second tab or window, open the SOURCE playlist you want to add the videos FROM.

Carefully consider the order in which you want to add videos.  My script runs sequentially, adding each SOURCE video in the order it appears on the page, as if you were adding it manually to the DESTINATION playlist.

So if the DESTINATION is set to add videos to the top of the playlist, the script will add the first video shown in the SOURCE playlist to the top of the DESTINATION.  But then it will add the second video from the SOURCE to the top as well, ABOVE the first video, reversing their order in the SOURCE playlist, just as if you did it manually row by row.  Use the playlist's Sort option to change or reverse these orders as needed.

Then, in the SOURCE playlist tab, hit F12 to open debugging tools and open the Console.  Copy paste the entire contents of "copy_youtube_playlist.js" into the console, and hit enter.  This will paste fine even though it's quite a few lines and the console window suggests you're only typing one line at a time.

Then wait while it runs.  If there are no errors, it will copy one video about every half a second.  Any faster and Youtube may not respond fast enough to its instructions.

# Settings
The script has four configuration variables at the top:

*playlist_to_add_to* - This needs to be the exact name of your DESTINATION playlist as it appears in the "save to playlist" popup, which may not be the exact name of the actual playlist

*video_to_start_at* - This is the sequential number of the video you want to start at.  Usually 0, but sometimes you may only want a later part of a playlist, or if an error occurred midway through a copy you can skip the early videos.

*video_to_end_at* - This is the sequential number of the video you want to stop at.  0 to copy every visible video on the page.  RECOMMENDED that you set this to 2 or 3 to test with until you're comfortable with how the script works and the order it does things in.  You can just manually remove the videos again to test again.

*step_interval* - RECOMMENDED that you leave this at 400.  That's about as fast as I can run this script reliably without Youtube responding a little too slowly and causing an error.
