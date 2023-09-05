TIME_ZONE = "UTC".freeze

class WorkPlanning
  def initialize(work_raw_planning:, events_raw_lanning:)
		# NOTE : We need to use index here because YAML module produced a root array
		@blocked_hours = work_raw_planning[1][:blockSlot].first
		@regular_working_hours = work_raw_planning[0][:allowDayAndTime]
		@extra_working_hours = work_raw_planning[2][:allowSlot].first
		@events_planning = events_raw_lanning
	end

	attr_reader :extra_working_hours

	def timelots_for_date(current_date, preparation_duration)
		if included_in_extra_hours?(current_date)
			extra_timelots(preparation_duration)
		else
			regular_timelots(current_date, preparation_duration)
		end
	end

	def included_in_blocked_hours?(selected_date)
		blocked_hours_range = DateTime.parse(@blocked_hours[:start])..DateTime.parse(@blocked_hours[:end])

		return blocked_hours_range.cover?(selected_date)
	end

	private

	def included_in_extra_hours?(current_date)
		current_date.day == DateTime.parse(extra_working_hours[:start]).day
	end

	def extra_timelots(preparation_duration)
		timelots = []
		start_time = Time.parse(extra_working_hours[:start])
		end_time = Time.parse(extra_working_hours[:end])

		timelots_for_times(start_time, end_time, preparation_duration)
	end

	def regular_timelots(current_date, preparation_duration)
		current_day = current_date.wday

		@regular_working_hours.filter_map do |working_hours|
			if working_hours[:day] == current_day
				start_hour = working_hours[:start].split(':')
				end_hour = working_hours[:end].split(':')

				start_time = Time.new(current_date.year, current_date.month, current_date.day, start_hour.first, start_hour.last, 0, TIME_ZONE)
				end_time = Time.new(current_date.year, current_date.month, current_date.day, end_hour.first, end_hour.last, 0, TIME_ZONE)
				

				timelots_for_times(start_time, end_time, preparation_duration)
			end
		end.flatten
	end

	def timelots_for_times(start_time, end_time, preparation_duration)
		timelots = []

		events.each do |event|
			# NOTE : When the event is in the middle we split the timelot
			if (start_time..end_time).cover?(event.begin - preparation_duration)
				timelots << { start: start_time, end: event.begin - preparation_duration }
				start_time = event.end
			end
		end

		# NOTE : This line put the last timeslot
		timelots << { start: start_time, end: end_time }
	end

	def events
		@events_planning.map do |event|
				event[:start]..event[:end]
		end
	end
end