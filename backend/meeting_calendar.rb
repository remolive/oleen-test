require 'pry'

class MeetingCalendar
	def initialize(work_planning:, params:)
		@work_planning = work_planning
		@slot_duration = params[:duration] * 60  # 15 * 60sec = 15min
		@preparation_duration = params[:preparation] * 60
		@start_date = DateTime.parse(params[:from])
		@end_date = DateTime.parse(params[:to])
	end


	def free_slots
		current_date = @start_date
		slots_group = []

		while (current_date < @end_date) do
			if !@work_planning.included_in_blocked_hours?(current_date)
				timelots = @work_planning.timelots_for_date(current_date, @preparation_duration)

				slots_group << parse_timelots(timelots)
			end

			current_date += 1 # increment by one day
		end

		slots_group
	end

	private

	def parse_timelots(timelots)
		slots = []

		timelots.each do |timelot|
			slots += create_slots(timelot[:start], timelot[:end])
		end

		slots
	end

	def create_slots(start_time, end_time)
		slots = []
		end_slot = start_time + @slot_duration

		while (end_slot <= end_time) do
			slots << start_time.localtime("+01:00")

			start_time = end_slot
			end_slot = start_time + @slot_duration
		end

		slots
	end
end