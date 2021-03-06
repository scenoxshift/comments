<?php

namespace App\Http\Controllers;

use App\BLL\CommentResource;
use BaseTree\Controllers\WebController;
use Illuminate\Http\Request;

class CommentsController extends WebController
{
	/**
	 * CommentsController constructor.
	 * @param CommentResource $resource
	 */
	public function __construct(CommentResource $resource)
	{
		parent::__construct($resource);
	}
}
