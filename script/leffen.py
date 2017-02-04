#!/usr/bin/python

# Step 1. Open specified folder and check if videos exist
# Step 2. Parse metadata file and check for errors
# Step 3. Beging upload to YT by populating required fields and calling API
# Step 4. Create the progress indicator for videos being uploaded
# Step 5. Notify endpoint that upload is complete
# Step 6. Collect Messenger IDs for Messenger Bot

#--------------------------------------------------------------------------#
# Import Libraries                                                         #
#--------------------------------------------------------------------------#
import sys
import os
import glob

#--------------------------------------------------------------------------#
# Global Variables                                                         #
#--------------------------------------------------------------------------#
video_dir = ""
videos_list = []
metadata = {k: [] for k in range(6)}

#--------------------------------------------------------------------------#
# Function to parse command line arguments                                 #
#--------------------------------------------------------------------------#
def parse_args():
    global video_dir
    args_length = len(sys.argv)
    if args_length == 3:
        if sys.argv[1] == "-f" or sys.argv[1] == "--file":
            video_dir = sys.argv[2]
        else:
            sys.stderr.write("Usage: python leffen.py -f <Video Directory>")
            exit(1)
    else:
        sys.stderr.write("Usage: python leffen.py -f <Video Directory>")
        exit(1)

#--------------------------------------------------------------------------#
# Function to check if directory has vidoes                                #
#--------------------------------------------------------------------------#
def check_validity():
    global videos_list
    file_regex = video_dir + "./*.mov"
    videos_list = filter(os.path.isfile, glob.glob(file_regex))
    if not videos_list:
        sys.stderr.write("No videos found in given directory.\n\n")
        exit(1)
    for video in videos_list:
        print video

#--------------------------------------------------------------------------#
# Function to parse Metadata file                                          #
#--------------------------------------------------------------------------#
def parse_metadata():
    global metadata
    metadata_name = video_dir + "/metadata.txt"
    metadata_file = open(metadata_name)

    for video in videos_list:
        metadata[0].append(video)

    counter = 1
    for line in metadata_file:
        if line in ['\n', '\r\n']:
            counter = 1
            continue
        metadata[counter].append((line.split(":")[1]).strip())
        counter = counter + 1

    if len(metadata[0]) != len(metadata[1]):
            sys.stderr.write("Every video needs metadata in metadata.txt")
            exit(1)

    print metadata
    #print metadata[0][0]
    metadata_file.close()

#-------------------------------------------------------------------------#
# Main
#-------------------------------------------------------------------------#
if __name__ == '__main__':
    parse_args()
    check_validity()
    parse_metadata()
