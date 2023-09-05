require 'yaml'
require 'date'
require 'time'
require './work_planning.rb'
require './meeting_calendar.rb'

WORK_HOURS_FILENAME = "work_hours.yml".freeze
EVENTS_FILENAME = "events.yml".freeze
PSYCH_PERMITTED_CLASSES = [Date, Time].freeze

def main
	work_raw_planning = YAML.load_file(WORK_HOURS_FILENAME, permitted_classes: PSYCH_PERMITTED_CLASSES, symbolize_names: true)
	events_raw_lanning = YAML.load_file(EVENTS_FILENAME, permitted_classes: PSYCH_PERMITTED_CLASSES, symbolize_names: true)

	params = {
		"duration": 30,
		"preparation": 5,
		"from": "2021-03-01T00:00:00Z",
		"to": "2021-03-08T00:00:00Z",
	}
	work_planning = WorkPlanning.new(work_raw_planning: work_raw_planning, events_raw_lanning: events_raw_lanning)
	meeting_calendar = MeetingCalendar.new(work_planning: work_planning, params: params)
	puts meeting_calendar.free_slots()
end

main()