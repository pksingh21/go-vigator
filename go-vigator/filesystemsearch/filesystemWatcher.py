import watchdog.events
import watchdog.observers
import time
import sys
import logging
import os
class Handler(watchdog.events.PatternMatchingEventHandler):
    def __init__(self):
        # Set the patterns for PatternMatchingEventHandler
        watchdog.events.PatternMatchingEventHandler.__init__(
            self,
            patterns=["*.*","FileSystemChangx.log"],
            ignore_directories=True,
            case_sensitive=False,
        )
        self.logger = logging.getLogger('FileSystemChangx')
        self.logger.setLevel(logging.INFO)
        log_file_path = 'FileSystemChanges.log'
        handler = logging.FileHandler(log_file_path)
        handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))
        self.logger.addHandler(handler)

    def on_any_event(self, event):
        # if the event contains a hidden directory in path then ignore it
        
        if "\\." in event.src_path or "AppData" in event.src_path or "Windows" in event.src_path :
            return
        if "\\." in event.src_path or "AppData" in event.src_path :
            return
        if event.event_type=='moved':
            self.logger.info("moved$src_path$=$[%s]$to$dest_path$=$[%s] ",event.src_path,event.dest_path)
        elif event.event_type=='created':
            self.logger.info("created$src_path$=$[%s]",event.src_path)
        elif event.event_type=='deleted':
            self.logger.info("deleted$src_path$=$[%s]",event.src_path)
        return

if __name__ == "__main__":
    root_path = os.environ.get('ROOT_PATH', 'C:\\')
    print(root_path)
    path = sys.argv[1] if len(sys.argv) > 1 else root_path
    event_handler = Handler()
    observer = watchdog.observers.Observer()
    observer.schedule(event_handler, path=path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()