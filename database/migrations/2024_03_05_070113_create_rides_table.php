<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rides', function (Blueprint $table) {
            $table->integer('ride_id')->autoIncrement();
            $table->foreignId('customer_id')->constrained;
            $table->foreignId('driver_id')->constrained;
            $table->decimal('fare_amount', 10, 2);
            $table->enum('status', ['scheduled', 'ongoing', 'completed', 'cancelled']);
            $table->string('is_deleted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rides');
    }
};
