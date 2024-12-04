export const cirrusApi = [
    {
    "cirrus": {
        "params": {
            "ins_freq": {
                "type": "float",
                "default": 200,
                "desc": "A7 INS Frequency"
            },
            "path_nas":  {
                "type": "string",
                "default": "//192.168.1.6/Mobile_mapping",
                "desc": "Path to NAS / Mobile_mapping drive"
            },
            "epsg_process": {
                "type": "float",
                "default": 5845,
                "desc": "EPSG Code for processing pointcloud data ( pointcloud is exported in this CRS )"
            },
            "move_to_nas": {
                "type": "bool",
                "default": true,
                "desc": "Move the data to NAS"
            },
            "clip_input_data": {
                "type": "list",
                "desc": "Information for clipping input data. List of [start_time, endtime].",
                "default": []
            }
        },
        "packages": {
            "generate": {
                "desc": "Riegl project Generation options",
                "colorize_scan": {
                    "type": "bool",
                    "default": false,
                    "desc": "Riegl project Generation options, Colorize Scan Data"
                },
                "export_fast_annotation": {
                    "type": "bool",
                    "default": false,
                    "desc": "Export_fast_annotation, Colorize Scan Data"
                }
            },
            "basic": {
                "desc": "Basic operations for all projects",
                "merge_scanners": {
                    "type": "bool",
                    "default": true,
                    "desc": "Merge left and right scanner"
                }
            },
            "slow_speed_filter": {
                "desc": "Slow Speed filtering",
                "slow_vsz": {
                    "type": "float",
                    "default": 0.01,
                    "desc": "Voxel Downsample value in meters for Slow Speed Filter"
                },
                "slow_thres_speed": {
                    "type": "float",
                    "default": 5,
                    "package": "slow_speed_filter",
                    "desc": "A7 INS Frequency"
                },
                "slow_thres_time": {
                    "type": "float",
                    "default": 15,
                    "package": "slow_speed_filter",
                    "desc": "Threshold for selecting time ranges. 15.0 means only select ranges more than equal to 15 seconds."
                }
            },
            "point_density": {
                "desc": "Density Requirements",
                "step_len_gen_polygons": {
                    "type": "float",
                    "default": 2,
                    "desc": "Length of polygons in meters. Used in computing density."
                },
                "step_len_gen_frames": {
                    "type": "float",
                    "default": 0.1,
                    "desc": "Length of a frame in meters. Used in computing density."
                },
                "min_density": {
                    "type": "float",
                    "default": 3000,
                    "desc": "Minimum Valid Density within a polygon."
                },
                "max_density": {
                    "type": "float",
                    "default": 5000,
                    "desc": "Maximum Valid Density within a polygon."
                },
                "downsample_vsz": {
                    "type": "float",
                    "default": 0.01,
                    "desc": "The voxel size in meters for downsampling high density polygons."
                },
                "compute_density_post": {
                    "type": "float",
                    "default": false,
                    "desc": "Compute the density after downsampling."
                }
            },
            "delivery": {
                "desc": "Setup Delivery Folders",
                "grid_size": {
                    "type": "int",
                    "default": 1000,
                    "desc": "Output grid size in meters. 1000 Results in 1km x 1km. 10_000 results in 100m x 100m"
                },
                "group": {
                    "type": "int",
                    "default": 0,
                    "desc": "Group number for delivery folders"
                },
                "lop": {
                    "type": "int",
                    "default": 1,
                    "desc": "Leverans number for delivery folders"
                },
                "op_time_format": {
                    "type": "string",
                    "default": "stdtime_adjust",
                    "choices": [
                        "stdtime_adjust",
                        "stdtime",
                        "weeksecs"
                    ],
                    "desc": "Output Time format"
                },
                "epsg_output": {
                    "type": "float",
                    "default": 5845,
                    "desc": "EPSG Code for delivering pointcloud data"
                }
            },
            "quality_control": {
                "sample_laz_grid_step": {
                    "type": "int",
                    "default": 10000,
                    "desc": "Sample length in meters for selecting pointclouds for NH-Data height control. 10_000 meters means every 10km."
                },
                "nhdata_height_threshold": {
                    "type": "float",
                    "default": 0.1,
                    "desc": "Maximum allowed threshold for a NH-Data height control."
                }
            }
        }
    }
}
]

// export const cirrusApi = [
//     {
//         "project_name": "user_enters | defaults to sessionName from session.json i.e. 2024-07-10_10-10-11",
//         "vehicle": "Y1",
//         "session_name": "2024-07-10_10-10-11",
//         "path_nas": "//192.168.1.6/Mobile_mapping",
//         "comment": "user enters some comment here | optional",
//         "template": "cirrus",
//         "params": {
//             "ins_freq": 200,
//             "epsg_process": 5845,
//             "move_to_nas": true,
//             "clip_input_data": [
//                 [
//                     100,
//                     200
//                 ],
//                 [
//                     300,
//                     400
//                 ],
//                 [
//                     500,
//                     600
//                 ]
//             ]
//         },
//         "split_information": {
//             "load_from_nas": true,
//             "splits": {
//                 "220": {
//                     "E": {
//                         "place_from": "Place1",
//                         "place_to": "Place2",
//                         "time_ranges": [
//                             [
//                                 150,
//                                 175
//                             ]
//                         ]
//                     },
//                     "N": {
//                         "place_from": "Place2",
//                         "place_to": "Place3",
//                         "time_ranges": [
//                             [
//                                 250,
//                                 275
//                             ]
//                         ]
//                     }
//                 },
//                 "221": {
//                     "E": {
//                         "place_from": "Place3",
//                         "place_to": "Place1",
//                         "time_ranges": [
//                             [
//                                 445,
//                                 465
//                             ]
//                         ]
//                     }
//                 }
//             }
//         },
//         "pointclouds": {
//             "generate": {
//                 "colorize_scan": false,
//                 "export_fast_annotation": false
//             },
//             "basic": {
//                 "merge_scanners": true
//             },
//             "slow_speed_filter": {
//                 "slow_vsz": 0.01,
//                 "slow_thres_speed": 5,
//                 "slow_thres_time": 15
//             },
//             "point_density": {
//                 "step_len_gen_polygons": 2,
//                 "step_len_gen_frames": 0.1,
//                 "min_density": 3000,
//                 "max_density": 5000,
//                 "downsample_vsz": 0.01,
//                 "compute_density_post": false
//             },
//             "delivery": {
//                 "grid_size": 1000,
//                 "group": 0,
//                 "lop": 1,
//                 "op_time_format": "stdtime_adjust",
//                 "epsg_output": 5845
//             },
//             "quality_control": {
//                 "sample_laz_grid_step": 10000,
//                 "nhdata_height_threshold": 0.1
//             }
//         },
//         "images_360": {
//             "not_sure_what_happens_here": true
//         }
//     }
// ]