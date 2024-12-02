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
                    "desc": "export_fast_annotation, Colorize Scan Data"
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