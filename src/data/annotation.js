export const annotationApi = [

{
    "annotation": {
        "params": {
            "ins_freq": {
                "type": "float",
                "default": 200,
                "desc": "A7 INS Frequency"
            },
            "path_nas": {
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
                    "desc": "Colorize Scan Data, Riegl project Generation options"
                },
                "export_fast_annotation": {
                    "type": "bool",
                    "default": false,
                    "desc": "Colorize Scan Data, Export_fast_annotation"
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
            "delivery": {
                "desc": "Setup Delivery Folders",
                "op_time_format": {
                    "type": "string",
                    "default": "weeksecs",
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
            }
        }
    }
}
]