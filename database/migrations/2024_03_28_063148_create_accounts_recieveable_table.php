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
        Schema::create('accounts_recieveable', function (Blueprint $table) {
            $table->integer('accounts_recieveable_id')->autoIncrement();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('sales_jouranl_id');
            $table->decimal('amount', 10, 2);
            $table->decimal('debit', 10, 2)->nullable();
            $table->decimal('credit', 10, 2)->nullable();
            $table->date('debit_date')->nullable();
            $table->date('credit_date')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts_recieveable');
    }
};
