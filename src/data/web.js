export const webApi = [
    {
    "webInfo": {
    "Project_name": "User_enters | defaults to sessionName from session.json i.e. 2024-07-10_10-10-11",
    "Vehicle": "Y1",
    "Session_name": "2024-07-10_10-10-11",
    "Path_nas": "//192.168.1.6/Mobile_mapping",
    "Comment": "User enters some comment here | optional | dont develop this now",
    "Template": "Web360",
  },
      "params": {
        "Ins_freq": 200,
        "Epsg_process": 5845,
        "Move_to_nas": {
            "type": "bool",
            "default": true,
          },
        "Clip_input_data": []
      },
      "split_information": {
        "Load_from_nas": {
            "type": "bool",
            "default": false,
          },
        "Splits": []
      },
      "pointclouds": {
        "Generate": {
          "Colorize_scan": {
            "type": "bool",
            "default": false,
          },
          "Export_fast_annotation": {
            "type": "bool",
            "default": false,
          },
        },
        "Basic": {
          "Merge_scanners": {
            "type": "bool",
            "default": true,
          },
        },
        "Slow_speed_filter": {
          "Slow_vsz": 0.01,
          "Slow_thres_speed": 5,
          "Slow_thres_time": 15
        },
        "Delivery": {
          "Op_time_format": "weeksecs",
          "Epsg_output": 5845
        }
      },
      "image_360": {
        "params": {
          "Trigger_distance": 5,
          "Image_resolution": "Width x Height",
          "Blurring_objects":{
            "type": "bool",
            "default": false,
          }, 
          "Objects_to_blur": ["Car", "People"],
          "Stitching_radius": 2,
          "Cameras_to_stitch": {
            "front": true,
            "back": true,
            "both": true
          },
          "Export_360_images":{
            "type": "bool",
            "default": true,
          },
          "Export_camera_level_images": {
           "type": "bool",
            "default": {
              "type": "bool",
              "default": false,
            }
          },
          "Camera_ids_for_export": [0, 1, 2, 3, 4, 5],
          "Rotation_for_image": "both",
          "Output_directory": "/project/output",
          "Move_to_nas": {
            "type": "bool",
            "default": true,
          },
          "Image_list_format": "json",
          "Export_forward_facing_camera": {
            "type": "bool",
            "default": true,
          },
          "Image_frequency": 1.0,
          "Image_dimensions": "1920x1080",
          "Rotation_for_images": "none"
        },
        "packages": {
          "image_projection": {
            "desc": "Setup for image projections",
            "choices": {
              "Equirectangular": {
                "type": "bool",
                "default": false,
                "desc": "Enable equirectangular projection (360 panorama / 3D camera)"
              },
              "Rectilinear": {
                "type": "bool",
                "default": false,
                "desc": "Enable rectilinear (flat / 2D) projection"
              },
              "Cube_maps": {
                "type": "bool",
                "default": false,
                "desc": "Enable cube maps projection (360 panorama / 3D camera)"
              }
            }
          }
        }
      }
    }
  ];