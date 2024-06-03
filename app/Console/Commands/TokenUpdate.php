<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\TokenExpireNotification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class TokenUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:tokenUpdate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Users token update';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentDate = now();
        $allUsers = User::all();

        foreach ($allUsers as $user) {
            $userDate = Carbon::parse($user->created_at);
            $sessionActivityTime = Carbon::parse($user->last_activity_at);
            $minutesDifference = $userDate->diffInMinutes($sessionActivityTime);

            if ($minutesDifference > 30) {
                // Generate a new remember token
                // Send notification
                if($user->remember_token !=NULL)
                {
                    Notification::send($user, new TokenExpireNotification('Hi '.$user->name, 'Your token has expired. Please login again.'));
                }
                
                $newToken = null;

                // Set the new remember token
                $user->setRememberToken($newToken);

                // Save the changes
                $user->save();

                // Log the day difference
                Log::info("Remember token updated for user {$user->user_id}. Minutes difference: {$minutesDifference}");

                
            } else {
                Log::info("Remember token not updated for user {$user->user_id}. Minutes difference: {$minutesDifference}");
            }
        }
    }
}

