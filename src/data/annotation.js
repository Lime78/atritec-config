export const annotationApi = [
  {
    "annotationInfo": {
    "Project_name": "User_enters | defaults to sessionName from session.json i.e. 2024-07-10_10-10-11",
    "Vehicle": "Y1",
    "Session_name": "2024-07-10_10-10-11",
    "Path_nas": "//192.168.1.6/Mobile_mapping",
    "Comment": "User enters some comment here | optional | dont develop this now",
    "Template": "Annotation",
  },
      "params": {
        "Ins freq": 200,
        "Epsg process": 5845,
        "Move to nas":{
          "type": "bool",
          "default": true,
        },
        "Clip input data": []
      },
      "split_information": {
        "Load from nas":{
          "type": "bool",
          "default": false,
        },
        "Splits": []
      },
      "pointclouds": {
        "Generate": {
          "Colorize scan":{
            "type": "bool",
            "default": false,
          },
          "Export fast annotation":{
            "type": "bool",
            "default": false,
          }, 
        },
        "Basic": {
          "Merge scanners": {
            "type": "bool",
            "default": true,
          },
        },
        "Slow speed filter": {
          "Slow vsz": 0.01,
          "Slow thres_speed": 5,
          "Slow thres_time": 15
        },
        "Delivery": {
          "Op time format": "weeksecs",
          "Epsg output": 5845
        }
      },
      "image_360": {
        "params": {
          "Trigger distance": 5,
          "Image resolution": "Width x Height", 
          "Blurring objects":{
            "type": "bool",
            "default": false,
          }, 
          "Objects to blur": ["Car", "People"], 
          "Stitching radius": 2, 
          "Cameras to stitch (front back both)":["Front", " Back", " Both"],
          "Export 360 images":{
            "type": "bool",
            "default": true,
          },
          "Export camera level images": {
           "type": "bool",
            "default": {
              "type": "bool",
              "default": false,
            }
          },
          "Camera ids for export": [0, 1, 2, 3, 4, 5],
          "Rotation for image": "both",
          "Output directory": "/Project/Output",
          "Move to nas": {
            "type": "bool",
            "default": true,
          },
          "Image list format": "json",
          "Export forward facing camera": {
            "type": "bool",
            "default": true,
          },
          "Image frequency": 1.0,
          "Image dimensions": "1920x1080",
          "Rotation for images": "none"
        },
        "packages": {
          "image_projection": {
            "desc": "Setup for image projections",
            "choices": {
              "Equirectangular Enable equirectangular projection (360 panorama / 3D camera)": {
                "type": "bool",
                "default": {
                  "type": "bool",
                  "default": false,
                },
              },
              "Rectilinear Enable rectilinear (flat / 2D) projection": {
                "type": "bool",
                "default": false,
              },
              "Cube_maps Enable cube maps projection (360 panorama / 3D camera)": {
                "type": "bool",
                "default": false,
                }
              }
            }
          }
      }
    }
  ];