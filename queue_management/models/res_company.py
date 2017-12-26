# -*- encoding: utf-8 -*-
from odoo import fields
from odoo import models


class Company(models.Model):
    _name = 'res.company'
    _inherit = ['res.company']
    is_branch = fields.Boolean()

    def _model_selection(self):
        selection = super(Company, self)._model_selection()
        selection.append(('queue.management.branch', 'Queue Management Branch'))
        return selection
