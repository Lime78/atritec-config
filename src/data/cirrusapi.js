export const cirrusApi = [
    {
      "project_name": "user_enters | defaults to sessionName from session.json i.e. 2024-07-10_10-10-11",
      "vehicle": "Y1",
      "session_name": "2024-07-10_10-10-11",
      "path_nas": "//192.168.1.6/Mobile_mapping",
      "comment": "user enters some comment here | optional | dont develop this now",
      "template": "cirrus",
      "params": {
        "ins_freq": 200,
        "epsg_process": 5845,
        "move_to_nas": true,
        "clip_input_data": []
      },
      "split_information": {
        "load_from_nas": false,
        "splits": []
      },
      "pointclouds": {
        "generate": {
          "colorize_scan": {
            "type": "bool",
            "default": false,
          },
          "export_fast_annotation": {
            "type": "bool",
            "default": false,
          },
        },
        "basic": {
          "merge_scanners": {
            "type": "bool",
            "default": true,
          },
        },
        "slow_speed_filter": {
          "slow_vsz": 0.01,
          "slow_thres_speed": 5,
          "slow_thres_time": 15
        },
        "point_density": {
          "step_len_gen_polygons": 2,
          "step_len_gen_frames": 0.1,
          "min_density": 3000,
          "max_density": 5000,
          "downsample_vsz": 0.01,
          "compute_density_post": {
            "type": "bool",
            "default": false,
          },
        },
        "delivery": {
          "grid_size": 1000,
          "group": 0,
          "lop": 1,
          "op_time_format": "stdtime_adjust",
          "epsg_output": 5845
        },
        "quality_control": {
          "sample_laz_grid_step": 10000,
          "nhdata_height_threshold": 0.1
        }
      },
      "image_360": {
        "params": {
          "trigger_distance": 5,
          "image_resolution": "Width x Height",
          "blurring_objects": {
            "type": "bool",
            "default": false,
          },
          "objects_to_blur": ["Car", "People"],
          "stitching_radius": 2,
          "cameras_to_stitch": {
            "type": "bool",
            "front": true,
            "back": true,
            "both": true
          },
          "export_360_images": {
            "type": "bool",
            "default": true,
          },
          "export_camera_level_images": {
            "type": "bool",
            "default": false,
          },
          "camera_ids_for_export": [0, 1, 2, 3, 4, 5],
          "rotation_for_image": "both",
          "output_directory": "/project/output",
          "move_to_nas": {
            "type": "bool",
            "default": true,
          },
          "image_list_format": "json",
          "export_forward_facing_camera": {
            "type": "bool",
            "default": true,
          },
          "image_frequency": 1.0,
          "image_dimensions": "1920x1080",
          "rotation_for_images": "none"
        },
        "packages": {
          "image_projection": {
            "desc": "Setup for image projections",
            "choices": {
              "equirectangular": {
                "type": "bool",
                "default": false,
                "desc": "Enable equirectangular projection (360 panorama / 3D camera)"
              },
              "rectilinear": {
                "type": "bool",
                "default": false,
                "desc": "Enable rectilinear (flat / 2D) projection"
              },
              "cube_maps": {
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